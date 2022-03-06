import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Attachment } from "models/attachments/attachment.model";

export async function attachmentDetailsService ( attachmentId: string ) {
  const attachment = await Attachment.findById( attachmentId ).cache( CacheOptionServiceEnum.ATTACHMENT );
  if ( !attachment ) throw new NotFoundError();

  return attachment;
}