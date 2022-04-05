import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { IS3DeleteSingleObjectType, s3DeleteObject, s3DeleteObjects } from "infrastructure/s3/s3-delete";
import { Attachment } from "models/attachments/attachment.model";

export async function attachmentDeleteSingleFileService ( attachmentId: string ) {
  const attachment = await Attachment.findById( attachmentId );
  if ( !attachment ) throw new NotFoundError();
  const attachmentThumbnail = attachment.videoThumbnail
    ? await Attachment.findById( attachment.videoThumbnail ) : null;

  try {
    if ( attachmentThumbnail ) {
      await s3DeleteObject( {
        Bucket: process.env.S3_BUCKET!,
        Key: attachmentThumbnail.path,
      } );
      await attachmentThumbnail.delete();
    }
    await s3DeleteObject( {
      Bucket: process.env.S3_BUCKET!,
      Key: attachment.path,
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
  const Objects: IS3DeleteSingleObjectType[] = [];
  const deletedUrls: string[] = [];
  attachments.forEach( async a => {
    const videoThumbnail = a.videoThumbnail ? await Attachment.findById( a.videoThumbnail ) : null;
    if ( videoThumbnail ) {
      Objects.push( {
        Key: videoThumbnail.path
      } );
    }
    Objects.push( {
      Key: a.path
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