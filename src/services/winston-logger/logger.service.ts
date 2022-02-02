import winston from 'winston';
import { WinstonMongoDbConsoleTransport } from './custom-transport.service';
import { formatLogs } from './format-console-log.service';

export const logger = winston.createLogger( {
  transports: [
    new WinstonMongoDbConsoleTransport( {
      level: 'info',
      format: winston.format.json()
    } ),
    new winston.transports.Console( {
      level: process.env.NODE_ENV === "development" ? "debug" : "info",
      format: formatLogs
    } ),
    // new winston.transports.File( {
    //   filename: 'logs.log',
    //   level: 'info'
    // } )
    // new winston.transports.Http({
    //   level: 'warn',
    //   format: winston.format.json()
    // }),
    // new winston.transports.Console({
    //   level: 'info',
    //   format: winston.format.combine(
    //     winston.format.colorize(),
    //     winston.format.simple()
    //   )
    // })
  ]
} );