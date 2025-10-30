import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource.js";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { CronService } from "./cron/cron-service.js";
import { EmailService } from "./email/email.service.js";

const fsLogRepository = new LogRepositoryImpl( 
  new FileSystemDatasource(),
);
const mongoRepository = new LogRepositoryImpl( 
  new MongoLogDatasource(),
);

const postgresRepository = new LogRepositoryImpl( 
  new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {

  public static async start(){
    console.log('Server is running on port 3000');

    // CronService.createJob( 
    //   '*/5 * * * * *', 
    //   () => {
    //     const url = 'http://google.com';
    //     new CheckServiceMultiple(
    //       [fsLogRepository, mongoRepository, postgresRepository],
    //       () => console.log(`Check service ${ url } is ok`),
    //       ( error ) => console.error( error )
    //     ).execute( url );
    // }); 

  };

}
