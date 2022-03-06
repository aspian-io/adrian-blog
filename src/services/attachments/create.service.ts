import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { Attachment, AttachmentPolicyEnum } from "models/attachments/attachment.model";

export interface IAttachmentCreateService {
  url: string;
  policy: AttachmentPolicyEnum;
  fileName: string;
  caption: string;
  size: number;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export async function attachmentCreateService ( params: IAttachmentCreateService ) {
  const { url, policy, fileName, caption, size, createdBy, createdByIp, userAgent } = params;
  const attachment = Attachment.build( {
    url,
    policy,
    fileName,
    caption,
    size,
    createdBy,
    createdByIp,
    userAgent
  } );

  await attachment.save();
  clearCache( CacheOptionServiceEnum.ATTACHMENT );
  return attachment;
}