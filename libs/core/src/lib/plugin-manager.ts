/*
** EPITECH PROJECT, 2025
** Area_mirror
** File description:
** plugin-manager.ts
*/
import { ServicePlugin } from './interfaces/service.interface';
import * as fs from 'fs';
import * as path from 'path';

export class PluginManager {
  private plugins: Map<string, ServicePlugin> = new Map(); //stock plugins chargés, clé = ID du plugin, valeur = instance du plugin
  private libsPath = path.join(process.cwd(), 'libs');

  // Charge tous les plugins du dossier libs
  async loadPlugins(): Promise<void> {
    try {
      const libDirs = fs.readdirSync(this.libsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .filter(dir => dir.name.endsWith('-service'));

      for (const dir of libDirs) {
        try {
          const pluginPath = path.join(this.libsPath, dir.name, 'src/lib/plugin.ts');
          if (fs.existsSync(pluginPath)) {
            const pluginModule = await import(pluginPath);
            const PluginClass = pluginModule.default;
            
            if (PluginClass) {
              const plugin: ServicePlugin = new PluginClass();
              await plugin.initialize();
              this.plugins.set(plugin.id, plugin);
              console.log(`✅ Plugin ${plugin.name} (${plugin.id}) loaded successfully`);
            } else {
              console.warn(`⚠️  Plugin ${dir.name} does not export a default class`);
            }
          } else {
            console.warn(`⚠️  Plugin file not found for ${dir.name} at ${pluginPath}`);
          }
        } catch (error) {
          console.error(`❌ Failed to load plugin ${dir.name}:`, error);
        }
      }
    } catch (error) {
      console.error('❌ Failed to load plugins:', error);
    }
  }

  getPlugin(id: string): ServicePlugin | undefined {
    return this.plugins.get(id);
  }

  getAllPlugins(): ServicePlugin[] {
    return Array.from(this.plugins.values());
  }

  getAllServices(): any[] {
    return Array.from(this.plugins.values()).map(plugin => ({
      id: plugin.id,
      name: plugin.name,
      description: plugin.description,
      version: plugin.version,
      authType: plugin.authType,
      logoUrl: plugin.logoUrl,
      actions: plugin.actions.map(a => ({ 
        id: a.id,
        name: a.name, 
        description: a.description,
        parameters: a.parameters || []
      })),
      reactions: plugin.reactions.map(r => ({ 
        name: r.name, 
        description: r.description,
        parameters: r.parameters || []
      }))
    }));
  }

  getActionById(actionId: string): { plugin: ServicePlugin, action: any } | undefined {
    for (const plugin of this.plugins.values()) {
      const action = plugin.actions.find(a => a.id === actionId);
      if (action) {
        return { plugin, action };
      }
    }
    return undefined;
  }

  getReactionByName(pluginId: string, reactionName: string): { plugin: ServicePlugin, reaction: any } | undefined {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      const reaction = plugin.reactions.find(r => r.name === reactionName);
      if (reaction) {
        return { plugin, reaction };
      }
    }
    return undefined;
  }

  async executeAction(actionId: string, params: any, context: { userId: string; auth?: any }): Promise<any> {
    const result = this.getActionById(actionId);
    if (result) {
      return await result.action.handler(params, context);
    }
    throw new Error(`Action ${actionId} not found`);
  }

  async executeReaction(pluginId: string, reactionName: string, params: any): Promise<any> {
    const result = this.getReactionByName(pluginId, reactionName);
    if (result) {
      return await result.reaction.handler(params);
    }
    throw new Error(`Reaction ${pluginId}:${reactionName} not found`);
  }

  async destroyAllPlugins(): Promise<void> {
    for (const plugin of this.plugins.values()) {
      try {
        await plugin.destroy();
        console.log(`🔄 Plugin ${plugin.name} destroyed`);
      } catch (error) {
        console.error(`❌ Failed to destroy plugin ${plugin.name}:`, error);
      }
    }
    this.plugins.clear();
  }
}