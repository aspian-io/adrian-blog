import Queue from 'bull';
import chalk from 'chalk';
import { PlaceHolder } from 'infrastructure/string-utils/placeholder';
import { SMSUserInfoDto } from './DTOs/sms-user-info.dto';
import { sendPatternSMS } from './send-sms.service';

interface Payload {
  templateTitle: string;
  scheduledISODate: string;
  users: SMSUserInfoDto[];
  pattern: string;
  patternCode: string;
}

export const scheduledSMSQueueToSend = new Queue<Payload>( 'sms:scheduled-sending', process.env.REDIS_URL! );

scheduledSMSQueueToSend.process( async ( job ) => {
  await Promise.all( job.data.users.map( async ( user ) => {
    const patternValues = PlaceHolder.getSMSPatternProps( job.data.pattern );
    const values: Record<string, any> = {};
    patternValues.forEach( val => values[ val ] = user[ val as keyof SMSUserInfoDto ] );
    await sendPatternSMS( job.data.patternCode, user.mobilePhone, values );
  } ) );

  console.log(
    chalk.bold.green.inverse( " Queue Info " ),
    chalk.bold.green( `Several scheduled SMS with the template title of <${ job.data.templateTitle }> have been sent successfully` )
  );
} );