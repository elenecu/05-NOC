import { LogModel } from "../../data/mongo/index.js";
import { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";



export class MongoLogDatasource implements LogDatasource {


  async saveLog( log: LogEntity ): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log( 'Log saved in Mongo', newLog );
  }

  async getLogs( level: LogSeverityLevel ): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level });
    return logs.map( LogEntity.fromObject );
  }
}