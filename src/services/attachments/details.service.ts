import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { matchRules } from "infrastructure/string-utils/match-rules";
import { Attachment, AttachmentDoc } from "models/attachments/attachment.model";

export async function attachmentDetailsService (
  attachmentId: string,
  imgProxyParams?: Omit<IImgProxyPrams, "key">
): Promise<WithImgProxyUrlType<AttachmentDoc>> {
  const attachment = await Attachment.findById( attachmentId ).cache( CacheOptionServiceEnum.ATTACHMENT );
  if ( !attachment ) throw new NotFoundError();

  const imgProxySignedUrl = imgProxyParams?.resizingType && matchRules( attachment.type, "image/*" )
    ? imgProxySignUrl( { ...imgProxyParams, key: attachment.path } )
    : "";
  return { ...attachment.toJSON<AttachmentDoc>(), imgProxySignedUrl };
}

