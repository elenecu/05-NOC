import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin.js';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity.js';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(){}

  async sendEmail( options: SendEmailOptions ): Promise<boolean> {
    const { to, subject, html, attachments = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({ to, subject, html, attachments });
      // console.log( 'Message sent: ', sendInformation );
      const log = new LogEntity({
        message: `Email sent successfully to ${ to }`,
        level: LogSeverityLevel.low,
        origin: 'email.service.ts',
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${ error }`,
        level: LogSeverityLevel.high,
        origin: 'email.service.ts',
      });

      return false;
    }
  };

  async sendEmailWithFileSystemLogs( to: string | string[] ){
    const subject = 'Logs del servidor';
    const html = `
    <h1 style="color: blue">Logs del servidor</h1>
    <p style="color: red">Logs del servidor</p>
    `;

    const attachments = [
      { filename: 'logs-low.log', path: 'logs/logs-low.log' },
      { filename: 'logs-medium.log', path: 'logs/logs-medium.log' },
      { filename: 'logs-high.log', path: 'logs/logs-high.log' },
    ];

    return this.sendEmail({ to, subject, html, attachments });
  }


};