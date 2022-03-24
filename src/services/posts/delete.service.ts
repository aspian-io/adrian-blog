import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { BadRequestError } from 'infrastructure/errors/bad-request-error';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { PostLocaleEnum } from 'infrastructure/locales/service-locale-keys/posts.locale';
import { Post, PostTypeEnum } from 'models/posts/post.model';
import { SettingsKeyEnum } from 'models/settings/settings.model';
import mongoose from 'mongoose';
import { settingGetValueService } from 'services/settings/get-value.service';

export async function postDeleteService ( slug: string ) {
  const post = await Post.findOne( { slug } );
  if ( !post ) throw new NotFoundError();

  if ( post.type === PostTypeEnum.SMS_BIRTHDAY_TEMPLATE ) {
    const birthdayCongratsSettingVal = await settingGetValueService( SettingsKeyEnum.SMS_BIRTHDAY_CONGRATS );
    if ( birthdayCongratsSettingVal === "true" ) {
      throw new BadRequestError(
        "You must turn off birthday congrats functionality to delete a birthday SMS pattern",
        PostLocaleEnum.ERROR_BIRTHDAY_CONGRATS_ON
      );
    }
  }

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  await Post.updateMany( { parent: post.id }, { $unset: { parent: "" } }, { session } );
  await Post.updateMany( { child: post.id }, { $unset: { child: "" } }, { session } );
  await post.delete( { session } );
  clearCache( CacheOptionServiceEnum.POST );

  await session.commitTransaction();
  session.endSession();

  return post;
}