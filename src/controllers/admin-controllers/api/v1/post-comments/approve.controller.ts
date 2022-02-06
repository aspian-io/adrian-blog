import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { CommentLocaleEnum } from "../../../../../locales/service-locale-keys/post-comment.locale";
import { postCommentApproveService } from "../../../../../services/post-comments/approve.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostCommentApproveController ( req: Request, res: Response ) {
  const comment = await postCommentApproveService( req.params.id, req.body.isApproved );
  res.send( comment );
  logger.info(
    "Post comment approval changed successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_APPROVE, comment.title )
  );
}