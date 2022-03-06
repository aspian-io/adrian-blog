import { Request, Response } from "express";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { attachmentGetPresignedUrlService } from "services/attachments/presigned-url.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminGetPresignedUrlController ( req: Request, res: Response ) {
  const url = await attachmentGetPresignedUrlService( req.params.id );
  res.send( url );
  logger.info(
    `${ req.currentUser!.email } retrieved a presigned url`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_PRESIGNED_URL, {
      attachment: { id: req.params.id }
    } )
  );
}