import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { PostTypeEnum } from "models/posts/post.model";
import { postDetailsService } from "services/posts/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function postNewsDetailsController ( req: Request, res: Response ) {
  const newsDetails = await postDetailsService(
    req.params.slug,
    PostTypeEnum.NEWS,
    { ...req.query as Omit<IImgProxyPrams, "key"> }
  );
  res.send( newsDetails );
  logger.info(
    `${ newsDetails.title } (news) details retrieved successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_NEWS_DETAILS, {
      post: {
        id: newsDetails.id
      }
    } )
  );
}