import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { PostLocaleEnum } from "../../../../../locales/service-locale-keys/posts.locale";
import { postCreateService } from "../../../../../services/posts/create.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostCreateController ( req: Request, res: Response ) {
  const {
    title, subtitle, excerpt, content, visibility,
    status, scheduledFor, commentAllowed, viewCount, type,
    isPinned, parent, taxonomies, attachments, postmeta
  } = req.body;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const post = await postCreateService( {
    title, subtitle, excerpt, content, visibility,
    status, scheduledFor, commentAllowed, viewCount, type,
    isPinned, parent, taxonomies, attachments, postmeta,
    createdBy: req.currentUser!.id, createdByIp: req.ip, userAgent
  } );

  res.status( 201 ).send( post );
  logger.info( "A new post created successfully", logSerializer( req, res, PostLocaleEnum.INFO_CREATE, req.body.title ) );
}