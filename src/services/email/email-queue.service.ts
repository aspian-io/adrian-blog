import Queue from 'bull';
import chalk from 'chalk';
import { sendMail } from 'infrastructure/email/mailer';
import { PlaceHolder } from 'infrastructure/string-utils/placeholder';
import { EmailUserInfoDto } from './DTOs/email-user-info.dto';

interface Payload {
  templateTitle: string;
  scheduledISODate: string;
  users: EmailUserInfoDto[];
  subject: string;
  template: string;
}

export const scheduledEmailQueueToSend = new Queue<Payload>( 'email:scheduled-sending', process.env.REDIS_URL! );

scheduledEmailQueueToSend.process( async ( job ) => {
  await Promise.all( job.data.users.map( async ( user ) => {
    const generatedContent = PlaceHolder.replaceWith( job.data.template, user );
    await sendMail( {
      from: process.env.EMAIL!,
      to: user.email,
      subject: job.data.subject,
      html: generatedContent
    } );
  } ) );

  console.log(
    chalk.bold.green.inverse( " Queue Info " ),
    chalk.bold.green( `Scheduled emails with the subject of <${ job.data.subject }> have been sent successfully` )
  );
} );