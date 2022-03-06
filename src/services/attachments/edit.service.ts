import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Attachment } from "models/attachments/attachment.model";

export interface IAttachmentEditService {
  attachmentId: string;
  fileName: string;
  caption: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function attachmentEditService ( params: IAttachmentEditService ) {
  const { attachmentId, fileName, caption, updatedBy, updatedByIp, userAgent } = params;
  const attachment = await Attachment.findById( attachmentId );
  if ( !attachment ) throw new NotFoundError();

  attachment.set( {
    fileName,
    caption,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await attachment.save();
  clearCache( CacheOptionServiceEnum.ATTACHMENT );
  return attachment;
}