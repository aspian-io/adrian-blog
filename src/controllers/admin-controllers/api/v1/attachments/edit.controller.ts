import { Request, Response } from "express";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { attachmentEditService } from "services/attachments/edit.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentEditController ( req: Request, res: Response ) {
  const attachment = await attachmentEditService( {
    ...req.body,
    attachmentId: req.params.id,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent: req.get( 'User-Agent' ) || 'unknown_agent'
  } );

  res.send( attachment );
  logger.info(
    `${ req.currentUser!.email } edited an uploaded file info successfully`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_EDIT, {
      attachment: { id: attachment.id }
    } )
  );
}