import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { PostTypeEnum } from "models/posts/post.model";
import { postDetailsService } from "services/posts/details.service";
import { PostDto } from "services/posts/DTOs/post.dto";
import { logger } from "services/winston-logger/logger.service";

export async function postBlogDetailsController ( req: Request, res: Response ) {
  const blog = await postDetailsService( req.params.slug, PostTypeEnum.BLOG );
  const postDto = dtoMapper( blog, PostDto );
  res.send( postDto );
  logger.info(
    `${ blog.title } (blog) details retrieved successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_BLOG_DETAILS, {
      post: {
        id: blog.id
      }
    } )
  );
}