import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { PostDto } from "services/posts/DTOs/post.dto";
import { postLikeService } from "services/posts/like.service";
import { logger } from "services/winston-logger/logger.service";

export async function postLikeController ( req: Request, res: Response ) {
  const post = await postLikeService( {
    slug: req.params.postSlug,
    userId: req.currentUser!.id,
    ipAddress: req.ip,
    userAgent: req.get( 'User-Agent' ) || 'unknown_agent'
  } );
  const postDto = dtoMapper( post, PostDto );
  res.send( postDto );
  logger.info(
    `Post ${ post.title } of type ${ post.type } liked/unliked successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_LIKE, {
      post: {
        id: post.id
      }
    } )
  );
}