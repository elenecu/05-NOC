import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js";
import type { LogRepository } from "../../repository/log.repository.js";

interface CheckServiceMultipleUseCase{
  execute( url: string ): Promise<boolean>;
}

type SucessCalback = ( () => void ) | undefined;
type ErrorCallback = ( ( error: string ) => void ) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly sucessCallback: SucessCalback,
    private readonly errorCallback: ErrorCallback
  ){

  }

  private callLogs( log: LogEntity ): void {
    this.logRepository.forEach( logRepository => {
      logRepository.saveLog( log );
    });
  }

  public async execute( url: string ): Promise<boolean> {

    try {
      const req = await fetch( url );

      if( !req.ok ) {
        throw new Error( `Error on check service ${ url }` );
      };

      const log = new LogEntity( { message: `Service ${ url } working`, level: LogSeverityLevel.low, origin: 'check-service.ts' } );

      this.callLogs( log );
      this.sucessCallback?.();
      return true;
    } catch ( error ) {
      const errorMessage = `${ error }`;
      const log = new LogEntity( { message: errorMessage, level: LogSeverityLevel.high, origin: 'check-service.ts' } );
      this.callLogs( log );
      this.errorCallback?.( errorMessage );
      return false;
    };
  };
};
