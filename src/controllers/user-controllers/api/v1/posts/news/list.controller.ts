import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { PostStatusEnum, PostTypeEnum } from "models/posts/post.model";
import { PostDto } from "services/posts/DTOs/post.dto";
import { postListService } from "services/posts/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function postNewsListController ( req: Request, res: Response ) {
  const newsPostsList = await postListService( {
    fieldsToExclude: [ "type", "taxonomies", "attachments", "postmeta" ],
    query: req.query,
    preDefinedFilters: [ {
      filterBy: "lang",
      filterParam: req.language
    }, {
      filterBy: "type",
      filterParam: PostTypeEnum.NEWS
    }, {
      filterBy: "status",
      filterParam: PostStatusEnum.PUBLISH
    } ],
    preDefinedOrders: [ {
      orderBy: "isPinned",
      orderParam: -1
    }, {
      orderBy: "order",
      orderParam: 1
    }, {
      orderBy: "createdAt",
      orderParam: -1
    } ],
    dataMapTo: PostDto
  } );
  res.send( newsPostsList );
  logger.info( "List of news posts retrieved successfully", logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_NEWS ) );
}