import { Request, Response } from "express";
import { SettingsServiceEnum } from "models/settings/settings.model";
import { settingsListService } from "services/settings/list.service";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { logger } from "services/winston-logger/logger.service";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";

export async function adminPostCommentSettingsListController ( req: Request, res: Response ) {
  const commentSettings = await settingsListService( SettingsServiceEnum.POST_COMMENTS );
  res.send( commentSettings );
  logger.info(
    "Post comment settings list retrieved successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_SETTINGS_LIST )
  );
}