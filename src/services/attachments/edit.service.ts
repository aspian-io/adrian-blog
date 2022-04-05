import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Attachment } from "models/attachments/attachment.model";
import { attachmentDeleteSingleFileService } from "./delete.service";

export interface IAttachmentEditService {
  attachmentId: string;
  fileName: string;
  caption: string;
  videoThumbnail?: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function attachmentEditService ( params: IAttachmentEditService ) {
  const { attachmentId, fileName, caption, videoThumbnail, updatedBy, updatedByIp, userAgent } = params;
  const attachment = await Attachment.findById( attachmentId ).populate( "videoThumbnail" );
  if ( !attachment ) throw new NotFoundError();

  if ( attachment.videoThumbnail && attachment.videoThumbnail.id.toString() !== videoThumbnail?.toString() ) {
    await attachmentDeleteSingleFileService(attachment.videoThumbnail.id);
  }

  attachment.set( {
    fileName,
    caption,
    videoThumbnail,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await attachment.save();
  clearCache( CacheOptionServiceEnum.ATTACHMENT );
  return attachment;
}