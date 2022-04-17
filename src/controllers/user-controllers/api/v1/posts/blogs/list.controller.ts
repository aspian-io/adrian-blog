import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { PostStatusEnum, PostTypeEnum } from "models/posts/post.model";
import { PostDto } from "services/posts/DTOs/post.dto";
import { postListService } from "services/posts/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function postBlogListController ( req: Request, res: Response ) {
  const posts = await postListService( {
    fieldsToExclude: [ "type", "taxonomies", "attachments" ],
    query: req.query,
    preDefinedFilters: [ {
      filterBy: "lang",
      filterParam: req.language
    }, {
      filterBy: "type",
      filterParam: PostTypeEnum.BLOG
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
    fieldsToPopulate: { path: 'numLikes' },
    dataMapTo: PostDto,
    imgProxyParams: { ...req.query as Omit<IImgProxyPrams, "key"> }
  } );
  res.send( posts );
  logger.info( "List of blogs retrieved successfully", logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_BLOGS ) );
}