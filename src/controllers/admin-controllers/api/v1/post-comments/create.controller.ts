import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { CommentLocaleEnum } from "../../../../../locales/service-locale-keys/post-comment.locale";
import { postCommentCreateService } from "../../../../../services/post-comments/create.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostCommentCreateController ( req: Request, res: Response ) {
  const { title, content, parent, post } = req.body;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const comment = await postCommentCreateService( {
    title,
    content,
    parent,
    post,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent
  } );

  res.status( 201 ).send( comment );
  logger.info(
    "Post comment created successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_CREATE, title )
  );
}