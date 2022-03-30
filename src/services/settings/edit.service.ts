import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { BadRequestError } from 'infrastructure/errors/bad-request-error';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { SettingLocaleEnum } from 'infrastructure/locales/service-locale-keys/settings.locale';
import { Post, PostTypeEnum } from 'models/posts/post.model';
import { Settings, SettingsKeyEnum } from 'models/settings/settings.model';
import { sendingNewsletterQueue, SENDING_NEWSLETTER_QUEUE_NAME } from 'services/email/newsletter-cronjob.service';
import { birthdayCongratsQueue, BIRTHDAY_CONGRATS_QUEUE_NAME } from '../sms/birthday-sms-cronjob.service';
import { settingGetValueService } from './get-value.service';

export interface ISettingsEdit {
  id: string;
  value: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function settingEditByIdService ( data: ISettingsEdit ) {
  const { id, value, updatedBy, updatedByIp, userAgent } = data;
  const setting = await Settings.findById( id );

  if ( !setting ) throw new NotFoundError();

  if ( setting.key === SettingsKeyEnum.SMS_BIRTHDAY_CONGRATS ) {
    await birthdayCongratsSettingProcessor( value );
  }
  if ( setting.key === SettingsKeyEnum.SMS_BIRTHDAY_CONGRATS_TIME ) {
    if ( !isHourNumberCorrect( value ) ) {
      throw new BadRequestError( "Hour number must be an integer between 0 and 23", SettingLocaleEnum.ERROR_HOUR );
    }
  }

  if ( setting.key === SettingsKeyEnum.EMAIL_NEWSLETTER_SEND ) {
    await sendingNewsletterSettingProcessor( value );
  }
  if ( setting.key === SettingsKeyEnum.EMAIL_NEWSLETTER_SEND_TIME ) {
    if ( !isHourNumberCorrect( value ) ) {
      throw new BadRequestError( "Hour number must be an integer between 0 and 23", SettingLocaleEnum.ERROR_HOUR );
    }
  }

  setting.set( {
    ...setting,
    value,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await setting.save();
  clearCache( CacheOptionServiceEnum.SETTINGS );
  return setting;
}

// Process setting value for birthday congratulation sms
async function birthdayCongratsSettingProcessor ( value: string ) {
  const timeInHour = parseInt( await settingGetValueService( SettingsKeyEnum.SMS_BIRTHDAY_CONGRATS_TIME ) );
  if ( value === "true" ) {
    const birthdaySMSPattern = await Post.findOne( { type: PostTypeEnum.SMS_BIRTHDAY_TEMPLATE } );
    if ( !birthdaySMSPattern ) {
      throw new BadRequestError(
        "You must create a birthday sms template beforehand to turn on the functionality",
        SettingLocaleEnum.ERROR_BIRTHDAY_CONGRATS_TEMPLATE
      );
    }
    await birthdayCongratsQueue.add( {}, { repeat: { cron: `0 ${ timeInHour } * * *` } } );
  } else {
    await birthdayCongratsQueue.removeRepeatable( BIRTHDAY_CONGRATS_QUEUE_NAME, { cron: `0 ${ timeInHour } * * *` } );
    await birthdayCongratsQueue.clean( 0, 'active' );
    await birthdayCongratsQueue.clean( 0, 'completed' );
    await birthdayCongratsQueue.clean( 0, 'delayed' );
    await birthdayCongratsQueue.clean( 0, 'wait' );
    await birthdayCongratsQueue.clean( 0, 'paused' );
    await birthdayCongratsQueue.clean( 0, 'failed' );
  }
}

// Process setting value for sending newsletter to subscribers
async function sendingNewsletterSettingProcessor ( value: string ) {
  const timeInHour = parseInt( await settingGetValueService( SettingsKeyEnum.EMAIL_NEWSLETTER_SEND_TIME ) );
  if ( value === "true" ) {
    const headerTemplateId = await settingGetValueService( SettingsKeyEnum.EMAIL_NEWSLETTER_HEADER );
    const bodyTemplateId = await settingGetValueService( SettingsKeyEnum.EMAIL_NEWSLETTER_BODY );
    const footerTemplateId = await settingGetValueService( SettingsKeyEnum.EMAIL_NEWSLETTER_FOOTER );

    const headerTemplate = await Post.findById( headerTemplateId );
    const bodyTemplate = await Post.findById( bodyTemplateId );
    const footerTemplate = await Post.findById( footerTemplateId );

    if ( !headerTemplate || !bodyTemplate || !footerTemplate ) {
      throw new BadRequestError(
        "Enabling newsletter cannot be done before setting newsletter's header and body and footer template",
        SettingLocaleEnum.ERROR_NEWSLETTER_ENABLING
      );
    }
    await sendingNewsletterQueue.add( {
      headerTemplateId,
      bodyTemplateId,
      footerTemplateId
    },
      { repeat: { cron: `0 ${ timeInHour } * * *` } }
    );
  } else {
    await birthdayCongratsQueue.removeRepeatable( SENDING_NEWSLETTER_QUEUE_NAME, { cron: `0 ${ timeInHour } * * *` } );
    await birthdayCongratsQueue.clean( 0, 'active' );
    await birthdayCongratsQueue.clean( 0, 'completed' );
    await birthdayCongratsQueue.clean( 0, 'delayed' );
    await birthdayCongratsQueue.clean( 0, 'wait' );
    await birthdayCongratsQueue.clean( 0, 'paused' );
    await birthdayCongratsQueue.clean( 0, 'failed' );
  }
}

// Check to see if a correct hour number has been entered
function isHourNumberCorrect ( value: string ) {
  if ( isNaN( parseInt( value ) ) || parseInt( value ) < 0 || parseInt( value ) > 23 ) {
    return false;
  }
  return true;
}