import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { PostLocaleEnum } from "../../../../../locales/service-locale-keys/posts.locale";
import { postEditService } from "../../../../../services/posts/edit.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostEditController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const post = await postEditService( {
    slug: req.params.s,
    title: req.body.title,
    subtitle: req.body.subtitle,
    excerpt: req.body.excerpt,
    content: req.body.content,
    visibility: req.body.visibility,
    status: req.body.status,
    scheduledFor: req.body.scheduledFor,
    commentAllowed: req.body.commentAllowed,
    viewCount: req.body.viewCount,
    type: req.body.type,
    isPinned: req.body.isPinned,
    child: req.body.child,
    parent: req.body.parent,
    taxonomies: req.body.taxonomies,
    attachments: req.body.attachments,
    postmeta: req.body.postmeta,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent
  } );
  res.send( post );
  logger.info(
    "A new post has been edited successfully",
    logSerializer( req, res, PostLocaleEnum.INFO_EDIT, req.body.title )
  );
}