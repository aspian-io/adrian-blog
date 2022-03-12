import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postDetailsService } from "services/posts/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostDetailsController ( req: Request, res: Response ) {
  const post = await postDetailsService( req.params.slug );
  res.send( post );
  logger.info(
    `Post ${ post.title } details of type ${ post.type } has been retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_DETAILS, { post: { id: post.id } } )
  );
}