import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentApproveService } from "services/post-comments/approve.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentApproveController ( req: Request, res: Response ) {
  const comment = await postCommentApproveService( req.params.id, req.body.isApproved );
  res.send( comment );
  logger.info(
    `Post comment approval changed by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, CommentLocaleEnum.INFO_APPROVE, {
      postComment: {
        id: comment.id
      }
    } )
  );
}