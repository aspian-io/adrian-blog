import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { Attachment, AttachmentPolicyEnum, AttachmentSectionEnum } from "models/attachments/attachment.model";

export interface IAttachmentCreateService {
  path: string;
  policy: AttachmentPolicyEnum;
  fileName: string;
  type: string;
  caption: string;
  size: number;
  section: AttachmentSectionEnum;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
  videoThumbnail?: string;
}

export async function attachmentCreateService ( params: IAttachmentCreateService ) {
  const { path, policy, fileName, type, caption, size, section, videoThumbnail, createdBy, createdByIp, userAgent } = params;
  const attachment = Attachment.build( {
    path,
    policy,
    fileName,
    type,
    caption,
    size,
    section,
    videoThumbnail,
    createdBy,
    createdByIp,
    userAgent
  } );

  await attachment.save();
  clearCache( CacheOptionServiceEnum.ATTACHMENT );
  return attachment;
}