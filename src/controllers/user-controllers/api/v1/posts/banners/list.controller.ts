import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { PostStatusEnum, PostTypeEnum } from "models/posts/post.model";
import { PostDto } from "services/posts/DTOs/banner.dto";
import { postListService } from "services/posts/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function postBannerListController ( req: Request, res: Response ) {
  const bannersDto = await postListService( {
    query: req.query,
    preDefinedFilters: [ {
      filterBy: "type",
      filterParam: PostTypeEnum.BANNER
    }, {
      filterBy: "status",
      filterParam: PostStatusEnum.PUBLISH
    }, {
      filterBy: "isPinned",
      filterParam: true
    } ],
    dataMapTo: PostDto
  } );
  res.send( bannersDto );

  logger.info(
    `Banners list have been retrieved successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_BANNERS )
  );
}