import { Request, Response } from "express";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { attachmentDetailsService } from "services/attachments/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentDetailsController ( req: Request, res: Response ) {
  const attachment = await attachmentDetailsService( req.params.id );
  res.send( attachment );
  logger.info(
    `${ req.currentUser!.email } retrieved an attachment details successfully`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_DETAILS, {
      attachment: { id: attachment.id }
    } )
  );
}