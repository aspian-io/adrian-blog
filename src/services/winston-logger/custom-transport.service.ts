import chalk from 'chalk';
import Transport from 'winston-transport';
import { activityCreateService, IActivityCreateService } from '../activities/create.service';

export class WinstonMongoDbConsoleTransport extends Transport {
  constructor ( opts?: Transport.TransportStreamOptions ) {
    super( opts );
    //
    // Consume any custom options here. e.g.:
    // - Connection information for databases
    // - Authentication information for APIs (e.g. loggly, papertrail,
    //   logentries, etc.).
    //
  }

  async log ( info: IActivityCreateService, callback: () => void ) {
    try {
      await activityCreateService( {
        level: info.level,
        method: info.method,
        url: info.url,
        status: info.status,
        responseTime: info.responseTime,
        userId: info.userId,
        userEmail: info.userEmail,
        userAgent: info.userAgent,
        message: info.message,
        localizedMsgKey: info.localizedMsgKey,
        name: info.name
      } );
    } catch ( error ) {
      console.log( "Something were wrong saving logs into database - ", error );
    }
    callback();
  }
}