import { NotFoundError } from 'errors/not-found-error';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from 'infrastructure/cache/cache-options.infra';
import { clearCache } from 'infrastructure/cache/clear-cache.infra';
import { CommentSettings } from 'models/post-comments/post-comments-settings.model';

export interface IPostCommentEditSettings {
  id: string;
  value: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function postCommentSettingEditById ( data: IPostCommentEditSettings ) {
  const { id, value, updatedBy, updatedByIp, userAgent } = data;
  const commentSetting = await CommentSettings.findById( id );

  if ( !commentSetting ) throw new NotFoundError();

  commentSetting.set( {
    ...commentSetting,
    value,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await commentSetting.save();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST_COMMENT_SETTINGS );
  return commentSetting;
}