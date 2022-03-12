import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentEditService } from "services/post-comments/edit.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentEditController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? 'unknown_agent';

  const comment = await postCommentEditService( {
    ...req.body,
    id: req.params.id,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent
  } );

  res.send( comment );
  logger.info(
    `Post comment modified by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, CommentLocaleEnum.INFO_EDIT, {
      postComment: {
        id: comment.id
      }
    } )
  );
}