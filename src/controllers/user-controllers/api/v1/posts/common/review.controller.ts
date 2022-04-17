import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { PostDto } from "services/posts/DTOs/post.dto";
import { postReviewService } from "services/posts/review.service";
import { logger } from "services/winston-logger/logger.service";

export async function postReviewController ( req: Request, res: Response ) {
  const post = await postReviewService( {
    slug: req.params.postSlug,
    rate: req.body.rate,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent: req.get( 'User-Agent' ) || 'unknown_agent'
  } );
  const postDto = dtoMapper( post, PostDto );
  res.send( postDto );
  logger.info(
    `Post ${ post.title } reviewed successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_REVIEW, {
      post: {
        id: post.id
      }
    } )
  );
}