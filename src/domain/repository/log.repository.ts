import { LogEntity, LogSeverityLevel } from "../entities/log.entity.js";


export abstract class LogRepository {

  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(level: LogSeverityLevel): Promise<LogEntity[]>;

}