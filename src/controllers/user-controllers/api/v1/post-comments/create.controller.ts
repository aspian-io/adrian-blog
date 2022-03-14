import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentCreateService } from "services/post-comments/create.service";
import { logger } from "services/winston-logger/logger.service";

export async function postCommentCreateController ( req: Request, res: Response ) {
  const comment = await postCommentCreateService( {
    title: req.body.title,
    content: req.body.content,
    post: req.body.post,
    parent: req.body.parent,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent: req.get( 'User-Agent' ) || 'unknown_agent'
  } );

  res.send( comment );
  logger.info(
    `Comment created by user <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, CommentLocaleEnum.INFO_CREATE, {
      postComment: {
        id: comment.data.id
      }
    } )
  );
}