import { Request, Response } from "express";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { attachmentDeleteMultipleFilesService } from "services/attachments/delete.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentDeleteManyController ( req: Request, res: Response ) {
  const deletedUrls = await attachmentDeleteMultipleFilesService( req.body.attachmentIds );
  res.send( deletedUrls );
  logger.info(
    `${ deletedUrls.length } file/files deleted successfully`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_DELETE_MANY, {
      attachment: {
        url: deletedUrls.join()
      }
    } )
  );
}