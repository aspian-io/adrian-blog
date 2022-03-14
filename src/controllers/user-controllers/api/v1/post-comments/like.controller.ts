import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { PostCommentDto } from "services/post-comments/DTOs/post-comment.dto";
import { postCommentLikeService } from "services/post-comments/like.service";
import { logger } from "services/winston-logger/logger.service";

export async function postCommentLikeController ( req: Request, res: Response ) {
  const comment = await postCommentLikeService( {
    commentId: req.params.id,
    userId: req.currentUser!.id,
    ipAddress: req.ip,
    userAgent: req.get( 'User-Agent' ) || 'unknown_agent'
  } );
  const commentDto = dtoMapper( comment, PostCommentDto );
  res.send( commentDto );
  logger.info(
    "A comment liked/unliked successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_USERAREA_LIKE, {
      postComment: {
        id: comment.id
      }
    } )
  );
}