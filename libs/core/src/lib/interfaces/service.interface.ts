/*
** EPITECH PROJECT, 2025
** Area_mirror
** File description:
** service.interface.ts
*/

export interface ServiceAction {
  id: string; // ex: "gmail:new_email"
  name: string;
  description: string;
  parameters?: ServiceParameter[];
  handler: (params: any, context: { userId: string; auth?: any }) => Promise<any>;
}


export interface ServiceReaction {
  name: string;
  description: string;
  parameters?: ServiceParameter[];
  handler: (params: any) => Promise<any>;
}


export interface ServiceParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'email' | 'date' | 'enum' | 'json';
  description: string;
  required: boolean;
  options?: string[]; // utile si type = enum
}


export interface ServicePlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  authType: 'oauth2' | 'apikey' | 'none';
  logoUrl?: string;
  actions: ServiceAction[];
  reactions: ServiceReaction[];
  initialize(): Promise<void>;
  destroy(): Promise<void>;
}
