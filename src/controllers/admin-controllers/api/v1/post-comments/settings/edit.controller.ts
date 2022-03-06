import { Request, Response } from "express";
import { settingEditByIdService } from "services/settings/edit.service";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { logger } from "services/winston-logger/logger.service";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";

export async function adminPostCommentSettingEditController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  const commentSetting = await settingEditByIdService( {
    id: req.params.id,
    value: req.body.value,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent
  } );
  res.send( commentSetting );
  logger.info(
    "Post comment setting changed successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_SETTINGS_EDIT, {
      settings: commentSetting
    } )
  );
}