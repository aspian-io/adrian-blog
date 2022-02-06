import { NotFoundError } from "../../../errors/not-found-error";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../../infrastructure/cache/cache-options.infra";
import { CommentSettings, CommentSettingsKeyEnum } from "../../../models/post-comments/post-comments-settings.model";

export async function postCommentSettingGetValueByKey ( key: CommentSettingsKeyEnum ) {
  const settingsDoc = await CommentSettings.findOne( { key } )
    .cache(
      CacheOptionAreaEnum.ADMIN,
      CacheOptionServiceEnum.POST_COMMENT_SETTINGS
    );

  if ( !settingsDoc ) throw new NotFoundError();

  return settingsDoc.value;
}