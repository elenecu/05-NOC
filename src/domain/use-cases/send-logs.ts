import type { EmailService } from "../../presentation/email/email.service.js";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity.js";
import type { LogRepository } from "../repository/log.repository.js";

interface sendLogsEmailUseCase {
  execute: ( to: string | string[] ) => Promise<boolean>;
}

export class SendEmailLogs implements sendLogsEmailUseCase {


  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ){}

  async execute( to: string | string[] ){

    try {

      const sent = this.emailService.sendEmailWithFileSystemLogs( to );
      if (!sent) throw new Error('Error sending email');
      const log = new LogEntity({
        message: 'Email sent successfully',
        level: LogSeverityLevel.low,
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog( log );
      return true;

    } catch (error) {

      const log = new LogEntity({
        message: `${ error }`,
        level: LogSeverityLevel.high,
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog( log );
      return false;
      
    }
  }
}
