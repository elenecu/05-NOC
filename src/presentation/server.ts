import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { CronService } from "./cron/cron-service.js";

export class Server {

  public static start(){
    console.log('Server is running on port 3000');

    CronService.createJob( 
      '*/5 * * * * *', 
      () => {
        const url = 'http://localhost:3000';
        new CheckService(
          () => console.log(`Check service ${ url } is ok`),
          ( error ) => console.error( error )
        ).execute( url );
    }); 

  };

}
