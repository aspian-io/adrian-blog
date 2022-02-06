import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { CommentLocaleEnum } from "../../../../../locales/service-locale-keys/post-comment.locale";
import { Comment } from "../../../../../models/post-comments/post-comment.model";
import { postCommentDeleteService } from "../../../../../services/post-comments/delete.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostCommentDeleteController ( req: Request, res: Response ) {
  const comment = await postCommentDeleteService( req.params.id );
  res.send( comment );
  logger.info(
    "Post comment deleted successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_DELETE, comment.title )
  );
}