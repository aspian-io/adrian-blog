import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentDetailsService } from "services/post-comments/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentDetailsController ( req: Request, res: Response ) {
  const comment = await postCommentDetailsService( req.params.id );
  res.send( comment );
  logger.info(
    "Post comment details retrieved successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_DETAILS, {
      postComment: {
        id: comment.id
      }
    } )
  );
}