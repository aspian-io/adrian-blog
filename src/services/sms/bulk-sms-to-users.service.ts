import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { SMSLocaleEnum } from "infrastructure/locales/service-locale-keys/sms.locale";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { PlaceHolder } from "infrastructure/string-utils/placeholder";
import { User } from "models/auth/auth-user.model";
import { Post, PostStatusEnum } from "models/posts/post.model";
import { SMSUserInfoDto } from "./DTOs/sms-user-info.dto";
import { sendPatternSMS } from './send-sms.service';
import { smsCreditService } from "./sms-credit.service";
import { scheduledSMSQueueToSend } from "./sms-queue.service";

export async function bulkSmsToUsersService ( userIds: string[], smsTemplateId: string, scheduledISODate?: string ) {
  const pattern = await Post.findById( smsTemplateId );
  if ( !pattern || pattern.status === PostStatusEnum.PENDING ) {
    throw new BadRequestError( "SMS pattern not found or is pending", SMSLocaleEnum.ERROR_PATTERN_NOT_FOUND );
  }
  const patternCodeInfo = pattern.postmeta?.find( pm => pm.key === "code" );
  if ( !patternCodeInfo ) {
    throw new BadRequestError(
      "SMS pattern code not found",
      SMSLocaleEnum.ERROR_PATTERN_CODE_NOT_FOUND
    );
  }
  const users = await User.find( { _id: { $in: userIds }, isMobilePhoneVerified: true } );
  if ( !users.length ) {
    throw new BadRequestError(
      "Requested users for receiving sms are not found or not have confirmed mobile phone numbers",
      SMSLocaleEnum.ERROR_USERS_NOT_FOUND
    );
  }

  const usersDto = dtoMapper( users, SMSUserInfoDto );
  const credit = await smsCreditService();
  const totalCost = usersDto.length * credit.smsCost;
  const isCreditEnough = totalCost + credit.minCredit;
  if ( !isCreditEnough || !credit.sendingSMSAllowed ) {
    throw new BadRequestError( "Credit amount is not enough to send SMS", SMSLocaleEnum.ERROR_PROVIDER_CREDIT );
  }
  if ( scheduledISODate ) {
    await scheduledSMSQueueToSend.add( {
      templateTitle: pattern.title,
      scheduledISODate,
      pattern: pattern.content,
      patternCode: patternCodeInfo.value,
      users: usersDto
    }, {
      delay: new Date( scheduledISODate ).getTime() - Date.now()
    } );
  } else {
    await Promise.all( usersDto.map( async ( user ) => {
      const patternValues = PlaceHolder.getSMSPatternProps( pattern.content );
      const values: Record<string, any> = {};
      patternValues.forEach( val => values[ val ] = user[ val as keyof SMSUserInfoDto ] );
      await sendPatternSMS( patternCodeInfo.value, user.mobilePhone, values );
    } ) );
  }
}