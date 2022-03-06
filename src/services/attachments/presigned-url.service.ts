import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { s3 } from "infrastructure/s3/s3.infra";
import { Attachment } from "models/attachments/attachment.model";

export async function attachmentGetPresignedUrlService ( attachmentId: string ) {
  const attachment = await Attachment.findById( attachmentId ).cache( CacheOptionServiceEnum.ATTACHMENT );
  if ( !attachment ) throw new NotFoundError();

  const url = s3.getSignedUrl( 'getObject', {
    Bucket: process.env.S3_BUCKET,
    Key: attachment.url,
    Expires: 24 * 60 * 60
  } );

  return url;
}