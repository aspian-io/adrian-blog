import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCreateService } from "services/posts/create.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCreateController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const post = await postCreateService( {
    ...req.body,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent
  } );

  res.status( 201 ).send( post );
  logger.info(
    `A new post of type ${ post.type } created by admin <${req.currentUser!.email}> successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_CREATE, { post: { id: post.id } } )
  );
}