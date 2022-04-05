import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { attachmentListService } from "services/attachments/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAttachmentListController ( req: Request, res: Response ) {
  const attachments = await attachmentListService( {
    query: req.query,
    preDefinedOrders: [ {
      orderBy: "createdAt",
      orderParam: -1
    } ],
    imgProxyParams: { ...req.query as Omit<IImgProxyPrams, "key"> }
  } );
  res.send( attachments );
  logger.info(
    `Admin <${ req.currentUser!.email }> retrieved attachment list successfully`,
    logSerializer( req, res, AttachmentLocaleEnum.INFO_LIST )
  );
}