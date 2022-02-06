import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { CommentLocaleEnum } from "../../../../../locales/service-locale-keys/post-comment.locale";
import { postCommentEditService } from "../../../../../services/post-comments/edit.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostCommentEditController ( req: Request, res: Response ) {
  const { title, content } = req.body;
  const userAgent = req.get( 'User-Agent' ) ?? 'unknown_agent';

  const comment = await postCommentEditService( {
    id: req.params.id,
    title,
    content,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent
  } );

  res.send( comment );
  logger.info(
    "Post comment edited successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_EDIT, title )
  );
}