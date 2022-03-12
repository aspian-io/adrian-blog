import { Request, Response } from "express";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postDeleteService } from "services/posts/delete.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostDeleteController ( req: Request, res: Response ) {
  const post = await postDeleteService( req.params.slug );
  res.send( post );
  logger.info(
    `The post ${ post.title } of type ${ post.type } has been deleted by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_DELETE, { post } )
  );
}