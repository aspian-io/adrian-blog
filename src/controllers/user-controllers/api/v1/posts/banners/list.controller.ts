import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { PostStatusEnum, PostTypeEnum } from "models/posts/post.model";
import { PostDto } from "services/posts/DTOs/post.dto";
import { postListService } from "services/posts/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function postBannerListController ( req: Request, res: Response ) {
  const banners = await postListService( {
    preDefinedFilters: [ {
      filterBy: "lang",
      filterParam: req.language
    }, {
      filterBy: "type",
      filterParam: PostTypeEnum.BANNER
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
  res.send( banners.data );

  logger.info(
    `Banners list have been retrieved successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_BANNERS )
  );
}