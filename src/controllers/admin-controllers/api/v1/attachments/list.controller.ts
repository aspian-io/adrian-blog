import { Request, Response } from "express";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { attachmentListService } from "services/attachments/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentListController ( req: Request, res: Response ) {
  const attachments = await attachmentListService( req.query );
  res.send( attachments );
  logger.info(
    `Admin <${ req.currentUser!.email }> retrieved attachment list successfully`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_LIST )
  );
}