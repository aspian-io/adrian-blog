import { Request, Response } from "express";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { attachmentDeleteSingleFileService } from "services/attachments/delete.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentDeleteController ( req: Request, res: Response ) {
  const attachment = await attachmentDeleteSingleFileService( req.params.id );
  res.send( attachment );
  logger.info( `${ attachment.fileName } deleted by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_DELETE, {
      attachment
    } )
  );
}