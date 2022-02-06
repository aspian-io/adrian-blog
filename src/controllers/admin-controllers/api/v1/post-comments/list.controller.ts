import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { CommentLocaleEnum } from "../../../../../locales/service-locale-keys/post-comment.locale";
import { postCommentListService } from "../../../../../services/post-comments/list.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostCommentListController ( req: Request, res: Response ) {
  const comments = await postCommentListService();
  res.send( comments );
  logger.info(
    "Post comment list retrieved successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_LIST )
  );
}