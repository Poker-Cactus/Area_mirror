/*
** EPITECH PROJECT, 2025
** Area_mirror
** File description:
** plugin.ts
*/

import { ServicePlugin, ServiceAction, ServiceReaction } from 'core';

export default class GmailServicePlugin implements ServicePlugin {
  id = 'gmail';
  name = 'Gmail';
  version = '1.0.0';
  description = 'Gmail service for sending and receiving emails';
  authType = 'oauth2' as const;
  logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png';

  actions: ServiceAction[] = [
    {
      id: 'gmail:new_email',
      name: 'New Email Received',
      description: 'Triggered when a new email is received in your Gmail inbox',
      parameters: [
        {
          name: 'from',
          type: 'email',
          description: 'Filter emails from specific sender (optional)',
          required: false
        },
        {
          name: 'subject_contains',
          type: 'string',
          description: 'Filter emails containing specific text in subject (optional)',
          required: false
        }
      ],
      handler: this.handleNewEmail.bind(this)
    },
    {
      id: 'gmail:new_email_with_attachment',
      name: 'New Email with Attachment',
      description: 'Triggered when a new email with attachments is received',
      parameters: [],
      handler: this.handleNewEmailWithAttachment.bind(this)
    }
  ];

  reactions: ServiceReaction[] = [
    {
      name: 'send_email',
      description: 'Send an email via Gmail',
      parameters: [
        { 
          name: 'to', 
          type: 'email', 
          description: 'Recipient email address', 
          required: true 
        },
        { 
          name: 'subject', 
          type: 'string', 
          description: 'Email subject', 
          required: true 
        },
        { 
          name: 'body', 
          type: 'string', 
          description: 'Email body content', 
          required: true 
        },
        {
          name: 'cc',
          type: 'email',
          description: 'CC recipient (optional)',
          required: false
        }
      ],
      handler: this.handleSendEmail.bind(this)
    },
    {
      name: 'send_email_with_attachment',
      description: 'Send an email with attachment via Gmail',
      parameters: [
        { 
          name: 'to', 
          type: 'email', 
          description: 'Recipient email address', 
          required: true 
        },
        { 
          name: 'subject', 
          type: 'string', 
          description: 'Email subject', 
          required: true 
        },
        { 
          name: 'body', 
          type: 'string', 
          description: 'Email body content', 
          required: true 
        },
        {
          name: 'attachment_url',
          type: 'string',
          description: 'URL of the file to attach',
          required: true
        }
      ],
      handler: this.handleSendEmailWithAttachment.bind(this)
    }
  ];

  async initialize(): Promise<void> {
    console.log('📧 Gmail service plugin initialized');
    // Initialize Gmail API connection, OAuth configuration, etc.
    // TODO: Setup Gmail API credentials and OAuth flow
  }

  async destroy(): Promise<void> {
    console.log('📧 Gmail service plugin destroyed');
    // Cleanup resources, close connections, etc.
  }

  private async handleNewEmail(params: any, context: { userId: string; auth?: any }): Promise<any> {
    console.log(`📨 Checking for new emails for user ${context.userId}`, params);
    
    // TODO: Implement Gmail API integration
    // 1. Use Gmail API to check for new emails
    // 2. Apply filters if provided (from, subject_contains)
    // 3. Return email data
    
    return {
      success: true,
      data: {
        emailId: 'mock-email-id',
        from: 'example@gmail.com',
        subject: 'Test Email',
        body: 'This is a test email',
        receivedAt: new Date().toISOString()
      }
    };
  }

  private async handleNewEmailWithAttachment(_params: any, context: { userId: string; auth?: any }): Promise<any> {
    console.log(`📎 Checking for new emails with attachments for user ${context.userId}`);
    
    // TODO: Implement Gmail API integration for emails with attachments
    
    return {
      success: true,
      data: {
        emailId: 'mock-email-with-attachment-id',
        from: 'sender@example.com',
        subject: 'Email with attachment',
        attachments: ['document.pdf']
      }
    };
  }

  private async handleSendEmail(params: any): Promise<any> {
    console.log(`📤 Sending email to ${params.to}: ${params.subject}`);
    
    // TODO: Implement Gmail API integration for sending emails
    // 1. Use Gmail API to send email
    // 2. Handle OAuth authentication
    // 3. Format email properly
    
    return {
      success: true,
      data: {
        messageId: 'mock-message-id',
        to: params.to,
        subject: params.subject,
        sentAt: new Date().toISOString()
      }
    };
  }

  private async handleSendEmailWithAttachment(params: any): Promise<any> {
    console.log(`📤📎 Sending email with attachment to ${params.to}: ${params.subject}`);
    
    // TODO: Implement Gmail API integration for sending emails with attachments
    // 1. Download file from attachment_url
    // 2. Attach to email
    // 3. Send via Gmail API
    
    return {
      success: true,
      data: {
        messageId: 'mock-message-with-attachment-id',
        to: params.to,
        subject: params.subject,
        attachmentUrl: params.attachment_url,
        sentAt: new Date().toISOString()
      }
    };
  }
}