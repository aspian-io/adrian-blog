import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postEditService } from "services/posts/edit.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostEditController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const post = await postEditService( {
    ...req.body,
    slug: req.params.slug,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent
  } );
  res.send( post );
  logger.info(
    `The post ${ post.title } of type ${ post.type } has been modified by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_EDIT, { post: { id: post.id } } )
  );
}