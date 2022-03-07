import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { Attachment } from "models/attachments/attachment.model";

export async function attachmentListService () {
  const attachments = await Attachment.find().cache( CacheOptionServiceEnum.ATTACHMENT );
  return attachments;
}