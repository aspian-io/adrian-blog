import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { PostTypeEnum } from "models/posts/post.model";
import { postDetailsService } from "services/posts/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function postPageDetailsController ( req: Request, res: Response ) {
  const page = await postDetailsService( req.params.slug, PostTypeEnum.PAGE );
  res.send( page );
  logger.info(
    `${ page.title } (page) details retrieved successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_PAGE_DETAILS, {
      post: {
        id: page.id
      }
    } )
  );
}