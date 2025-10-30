import { PrismaClient, SeverityLevel } from "../../generated/prisma/client.js";
import type { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity.js";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}


export class PostgresLogDatasource implements LogDatasource {


  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level
      },
    });
    console.log( 'Log saved in Postgres', newLog );
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const dbLogs = await prismaClient.logModel.findMany({
      where: { level },
    });

    return dbLogs.map( LogEntity.fromObject );
  }
}