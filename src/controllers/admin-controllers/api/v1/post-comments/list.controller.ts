import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentListService } from "services/post-comments/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentListController ( req: Request, res: Response ) {
  const comments = await postCommentListService( req.query );
  res.send( comments );
  logger.info(
    "Post comment list retrieved successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_LIST )
  );
}