import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const EMAIL_USER = this.configService.get<string>('GMAIL_USER');
    const EMAIL_APP_PASSWORD = this.configService.get<string>('GMAIL_APP_PASSWORD');

    // Crear el transporter con App Password (más simple que OAuth2)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD, // Esta es tu App Password, no tu contraseña normal
      },
      connectionTimeout: 30000, // 30 segundos para conectar
      socketTimeout: 30000, // 30 segundos para operaciones
      greetingTimeout: 30000, // 30 segundos para saludo SMTP
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const EMAIL_USER = this.configService.get<string>('GMAIL_USER');

      const mailOptions = {
        from: `"Sistema de Almacén" <${EMAIL_USER}>`,
        to,
        subject,
        html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email enviado correctamente:', result.messageId);
      return result;
    } catch (error) {
      console.error('❌ Error enviando email:', error);
      throw error;
    }
  }

  async sendEmailWithTemplate(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ) {
    try {
      // Aquí puedes implementar la lógica para renderizar templates
      // Por ahora, solo enviamos el HTML
      return await this.sendEmail(to, subject, template);
    } catch (error) {
      console.error('❌ Error enviando email con template:', error);
      throw error;
    }
  }
}

