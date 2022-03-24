import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { BadRequestError } from 'infrastructure/errors/bad-request-error';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { SettingLocaleEnum } from 'infrastructure/locales/service-locale-keys/settings.locale';
import { Post, PostTypeEnum } from 'models/posts/post.model';
import { Settings, SettingsKeyEnum } from 'models/settings/settings.model';
import { birthdayCongratsQueue } from './birthday-sms-cronjob.service';

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
  if ( value === "true" ) {
    const birthdaySMSPattern = await Post.findOne( { type: PostTypeEnum.SMS_BIRTHDAY_TEMPLATE } );
    if ( !birthdaySMSPattern ) {
      throw new BadRequestError(
        "You must create a birthday sms template beforehand to turn on the functionality",
        SettingLocaleEnum.ERROR_BIRTHDAY_CONGRATS_TEMPLATE
      );
    }
    await birthdayCongratsQueue.add( {}, { repeat: { cron: '0 12 * * *' } } );
  } else {
    await birthdayCongratsQueue.removeRepeatable( "birthday-cronjob:send-sms", { cron: '0 12 * * *' } );
    await birthdayCongratsQueue.clean( 0, 'active' );
    await birthdayCongratsQueue.clean( 0, 'completed' );
    await birthdayCongratsQueue.clean( 0, 'delayed' );
    await birthdayCongratsQueue.clean( 0, 'wait' );
    await birthdayCongratsQueue.clean( 0, 'paused' );
    await birthdayCongratsQueue.clean( 0, 'failed' );
  }
}