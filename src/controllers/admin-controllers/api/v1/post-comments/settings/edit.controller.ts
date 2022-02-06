import { Request, Response } from "express";
import { logSerializer } from "../../../../../../helpers/log-serializer.helper";
import { CommentLocaleEnum } from "../../../../../../locales/service-locale-keys/post-comment.locale";
import { postCommentSettingEditById } from "../../../../../../services/post-comments/settings/edit.service";
import { logger } from "../../../../../../services/winston-logger/logger.service";

export async function adminPostCommentSettingEditController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  const commentSetting = await postCommentSettingEditById( {
    id: req.params.id,
    value: req.body.value,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent
  } );
  res.send( commentSetting );
  logger.info(
    "Post comment setting changed successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_SETTINGS_EDIT, commentSetting.key )
  );
}