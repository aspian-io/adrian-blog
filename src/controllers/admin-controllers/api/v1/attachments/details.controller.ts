import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { attachmentDetailsService } from "services/attachments/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentDetailsController ( req: Request, res: Response ) {
  const attachment = await attachmentDetailsService(
    req.params.id,
    { ...req.query as Omit<IImgProxyPrams, "key"> }
  );
  res.send( attachment );
  logger.info(
    `Admin <${ req.currentUser!.email }> retrieved an attachment details successfully`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_DETAILS, {
      attachment: { id: attachment.id }
    } )
  );
}