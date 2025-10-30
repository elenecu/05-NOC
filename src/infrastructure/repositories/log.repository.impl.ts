import type { LogDatasource } from "../../domain/datasources/log.datasource.js";
import type { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";
import { LogRepository } from "../../domain/repository/log.repository.js";


export class LogRepositoryImpl extends LogRepository {

  constructor(
    private readonly logDatasource: LogDatasource
  ){
    super();
  }

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog( log );
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs( severityLevel );
  }


}