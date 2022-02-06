import { Request, Response } from "express";
import { logSerializer } from "../../../../../../helpers/log-serializer.helper";
import { CommentLocaleEnum } from "../../../../../../locales/service-locale-keys/post-comment.locale";
import { postCommentSettingsListService } from "../../../../../../services/post-comments/settings/list.service";
import { logger } from "../../../../../../services/winston-logger/logger.service";

export async function adminPostCommentSettingsListController ( req: Request, res: Response ) {
  const commentSettings = await postCommentSettingsListService();
  res.send( commentSettings );
  logger.info(
    "Post comment settings list retrieved successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_SETTINGS_LIST )
  );
}