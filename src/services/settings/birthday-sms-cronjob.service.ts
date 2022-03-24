import Queue from 'bull';
import chalk from 'chalk';
import { PlaceHolder } from 'infrastructure/string-utils/placeholder';
import { Post, PostTypeEnum } from 'models/posts/post.model';
import { AuthViewProfileDto } from 'services/auth/DTOs/view-profile.dto';
import { userBirthdayService } from 'services/auth/users/user-birthday.service';
import { sendPatternSMS } from 'services/sms/send-sms.service';
import { smsCreditService } from 'services/sms/sms-credit.service';

export const birthdayCongratsQueue = new Queue( 'birthday-cronjob:send-sms', process.env.REDIS_URL! );

birthdayCongratsQueue.process( async ( job ) => {
  const users = await userBirthdayService();
  if ( users.length ) {
    const pattern = await Post.findOne( { type: PostTypeEnum.SMS_BIRTHDAY_TEMPLATE } );
    if ( !pattern ) {
      return;
    }
    const patternCodeInfo = pattern.postmeta?.find( pm => pm.key === "code" );
    if ( !patternCodeInfo ) {
      return;
    }
    const credit = await smsCreditService();
    const totalCost = users.length * credit.smsCost;
    const isCreditEnough = totalCost + credit.minCredit;
    if ( !isCreditEnough || !credit.sendingSMSAllowed ) {
      return;
    }
    await Promise.all( users.map( async ( user ) => {
      const patternValues = PlaceHolder.getSMSPatternProps( pattern.content );
      const values: Record<string, any> = {};
      patternValues.forEach( val => values[ val ] = user[ val as keyof AuthViewProfileDto ] );
      if ( user.mobilePhone && user.isMobilePhoneVerified ) {
        await sendPatternSMS( patternCodeInfo.value, user.mobilePhone, values );
      }
    } ) );
    console.log(
      chalk.bold.green.inverse( " Queue Info " ),
      chalk.bold.green( `Birthday congratulation text messages as a cron job have been sent successfully` )
    );
  };
} );