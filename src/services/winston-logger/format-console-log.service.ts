import chalk from "chalk";
import { format } from "winston";

export const formatLogs = format.printf( ( {
  level,
  method,
  url,
  status,
  responseTime,
  userEmail,
  userAgent,
  message
} ): string => {
  const fmtLevel = parseInt( status! ) < 400
    ? chalk.bold.green.inverse( ` ${ level } ` )
    : chalk.bold.red.inverse( ` ${ level } ` );

  const fmtMethod = parseInt( status! ) < 400
    ? chalk.bold.green( `${ method }` )
    : chalk.bold.red( `${ method }` );

  const fmtUrl = parseInt( status! ) < 400
    ? chalk.bold.green( url )
    : chalk.bold.red( url );

  const fmtStatus = parseInt( status! ) < 400
    ? chalk.bold.green( status )
    : chalk.bold.red( status );

  const fmtResponseTime = getColorizedResponseTime( parseFloat( responseTime ) );
  const fmtUserEmail = chalk.bold.magenta( userEmail );
  const fmtUserAgent = chalk.bold.yellow( userAgent );
  const fmtMessage = chalk.bold.cyan( message );

  if ( process.env.NODE_ENV === "development" ) return [ fmtLevel, fmtMethod, fmtUrl, fmtStatus, fmtResponseTime, fmtUserEmail, fmtUserAgent, fmtMessage ].join( ' ' );
  return [ fmtLevel, fmtMethod, fmtUrl, fmtStatus, fmtResponseTime, fmtMessage ].join( ' ' );
} );

// Colorize response time based on how much time a request takes
const getColorizedResponseTime = ( responseTime: number ): string => {
  if ( responseTime < 400 ) {
    return chalk.bold.green( `${ responseTime }ms` );
  } else if ( responseTime >= 400 && responseTime < 800 ) {
    return chalk.bold.yellow( `${ responseTime }ms` );
  } else {
    return chalk.bold.red( `${ responseTime }ms` );
  }
};