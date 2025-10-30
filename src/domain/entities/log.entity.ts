


export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions){
    const { message, level, createdAt, origin } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt || new Date();
    this.origin = origin;
  }

  static fromJson( json: string ): LogEntity {
    json = (json === '') ? '{}' : json;
  
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity( { message, level, origin: 'log.entity.ts' } );
    
    log.createdAt = new Date( createdAt );

    return log;
  }

  static fromObject = ( object: { [key: string]: any } ): LogEntity => {
    const { message, level, createdAt, origin } = object;
    if( !message ) throw new Error('Message is required');
    const log = new LogEntity( { message, level, createdAt, origin } );
    return log;
  }
  
}