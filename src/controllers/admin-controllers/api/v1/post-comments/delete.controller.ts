import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentDeleteService } from "services/post-comments/delete.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentDeleteController ( req: Request, res: Response ) {
  const comment = await postCommentDeleteService( req.params.id );
  res.send( comment );
  logger.info(
    "Post comment deleted successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_DELETE, {
      postComment: comment
    } )
  );
}