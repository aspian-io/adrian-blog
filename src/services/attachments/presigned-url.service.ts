import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { s3 } from "infrastructure/s3/s3.infra";
import { Attachment } from "models/attachments/attachment.model";
import { SettingsKeyEnum } from "models/settings/settings.model";
import { settingGetValueService } from "services/settings/get-value.service";

export async function attachmentGetPresignedUrlService ( attachmentId: string ) {
  const attachment = await Attachment.findById( attachmentId ).cache( CacheOptionServiceEnum.ATTACHMENT );
  if ( !attachment ) throw new NotFoundError();
  const expHours = parseInt( await settingGetValueService( SettingsKeyEnum.ATTACHMENT_URL_EXP_HOURS ) );

  const url = s3.getSignedUrl( 'getObject', {
    Bucket: process.env.S3_BUCKET,
    Key: attachment.url,
    Expires: expHours * 60 * 60
  } );

  return url;
}