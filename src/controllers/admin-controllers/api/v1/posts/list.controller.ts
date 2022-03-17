import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postListService } from "services/posts/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostListController ( req: Request, res: Response ) {
  const posts = await postListService( {
    query: req.query,
    preDefinedOrders: [
      {
        orderBy: "isPinned",
        orderParam: -1
      },
      {
        orderBy: "order",
        orderParam: -1
      },
      {
        orderBy: "createdAt",
        orderParam: -1
      }
    ]
  } );
  res.send( posts );
  logger.info(
    `List of posts has been retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_LIST )
  );
}