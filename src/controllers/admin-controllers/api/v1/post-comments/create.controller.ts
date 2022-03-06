import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { postCommentCreateService } from "services/post-comments/create.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentCreateController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const comment = await postCommentCreateService( {
    ...req.body,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent
  } );

  res.status( 201 ).send( comment );
  logger.info(
    "Post comment created successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_CREATE, {
      postComment: {
        id: comment.id
      }
    } )
  );
}