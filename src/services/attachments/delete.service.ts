import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { IS3DeleteSingleObjectType, s3DeleteObject, s3DeleteObjects } from "infrastructure/s3/s3-delete.infra";
import { Attachment } from "models/attachments/attachment.model";

export async function attachmentDeleteSingleFileService ( attachmentId: string ) {
  const attachment = await Attachment.findById( attachmentId );
  if ( !attachment ) throw new NotFoundError();

  try {
    await s3DeleteObject( {
      Bucket: process.env.S3_BUCKET!,
      Key: attachment.url,
    } );
    await attachment.delete();
  } catch ( error ) {
    throw new BadRequestError( "Something went wrong deleting S3 object", CoreLocaleEnum.ERROR_400_MSG );
  }

  return attachment;
}

export async function attachmentDeleteMultipleFilesService ( attachmentIds: string[] ) {
  const attachments = await Attachment.find( { _id: attachmentIds } );
  if ( attachmentIds.length !== attachments.length ) throw new NotFoundError();
  let Objects: IS3DeleteSingleObjectType[] = [];
  let deletedUrls: string[] = [];
  attachments.forEach( a => {
    Objects.push( {
      Key: a.url
    } );
  } );

  try {
    const result = await s3DeleteObjects( {
      Bucket: process.env.S3_BUCKET!,
      Delete: {
        Objects,
        Quiet: false
      }
    } );
    result.Deleted!.forEach( async o => {
      deletedUrls.push( o.Key! );
      await Attachment.findOneAndDelete( { url: o.Key } );
    } );
  } catch ( error ) {
    throw new BadRequestError( "Something went wrong deleting S3 objects", CoreLocaleEnum.ERROR_400_MSG );
  }
  clearCache( CacheOptionServiceEnum.ATTACHMENT );
  return deletedUrls;
}