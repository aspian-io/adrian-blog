import { Request, Response } from "express";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentListService } from "services/post-comments/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentListController ( req: Request, res: Response ) {
  const comments = await postCommentListService( {
    query: req.query,
    preDefinedOrders: [ {
      orderBy: "createdAt",
      orderParam: -1
    } ]
  } );
  res.send( comments );
  logger.info(
    `Post comment list retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, CommentLocaleEnum.INFO_LIST )
  );
}