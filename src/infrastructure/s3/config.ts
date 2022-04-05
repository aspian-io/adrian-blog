import path from "path";
import { sanitize } from 'string-sanitizer';
import { isFileTypeAllowed } from "infrastructure/security/filetype-allowed";
import { AttachmentPolicyEnum, AttachmentSectionEnum } from "models/attachments/attachment.model";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { AttachmentLocaleEnum } from "infrastructure/locales/service-locale-keys/attachments.locale";
import { pathGeneratorBySection } from "./path-gen";

/**
 * Get AWS S3 Config Params.
 *
 * @function getS3ConfigParams
 * @param {number} expiresInSeconds - Upload link expiration time in seconds.
 * @param {string[]} allowedMimeTypes - Allowed mime types.
 * @return {object} The object of S3 config params.
 */
export const getS3ConfigParams = (
  expiresInSeconds: number = 1 * 60 * 60,
  allowedMimeTypes: string[] = defaultAllowedTypes ): object => {

  return s3BucketConfig( expiresInSeconds, allowedMimeTypes );
};

// Default Allowed Types
const defaultAllowedTypes = [
  'video/*',
  'image/*',
  'application/pdf',
  'application/epub+zip',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/rtf',
  'application/zip',
  'application/vnd.rar',
  'application/x-7z-compressed'
];
// Upload Server Host
const host = `${ process.env.HOST }:${ process.env.PORT }`;

// Filename generator params type
interface IFileNameGeneratorParams {
  userId: string;
  metadata: any;
  allowedMimeTypes: string[];
}
// Filename Generator
const fileNameGenerator = ( params: IFileNameGeneratorParams ) => {
  const { userId, metadata, allowedMimeTypes } = params;
  if ( !userId || !Object.values( AttachmentSectionEnum ).includes( metadata.section ) ) {
    throw new BadRequestError(
      "Something went wrong generating uploading file name",
      CoreLocaleEnum.ERROR_400_MSG
    );
  }
  const rawFileName = path.parse( metadata.name ).name;
  const fileExt = path.parse( metadata.name ).ext;
  const rootFolderName = metadata.access === AttachmentPolicyEnum.PRIVATE
    ? "private"
    : "download";
  // Sanitizing 
  const sanitizedFileName = sanitize.addUnderscore( rawFileName );
  // Check for file type 
  const isTypeAllowed = isFileTypeAllowed( metadata.type, allowedMimeTypes );
  if ( !isTypeAllowed ) {
    throw new BadRequestError( "File type not allowed", AttachmentLocaleEnum.ERROR_FILE_TYPE_NOT_ALLOWED );
  }
  // Compute full filename
  const fullFileName = `${ rootFolderName }/${ pathGeneratorBySection( metadata.section ) }/${ sanitizedFileName }_${ Date.now() }${ fileExt }`;
  return fullFileName;
};

// S3 Private Bucket Params
const s3BucketConfig = ( expiresInSeconds: number, allowedMimeTypes: string[] ) => {
  return {
    providerOptions: {
      s3: {
        getKey: ( req: any, filename: any, metadata: any ) => {
          return fileNameGenerator( {
            userId: req.currentUser.id,
            allowedMimeTypes,
            metadata
          } );
        },
        key: process.env.S3_ACCESS_KEY!,
        secret: process.env.S3_SECRET_KEY!,
        bucket: process.env.S3_BUCKET!,
        region: process.env.S3_REGION,
        useAccelerateEndpoint: false, // default: false,
        expires: expiresInSeconds, // default: 300 (5 minutes)
        acl: process.env.S3_ACL, // default: public-read
        awsClientOptions: {
          endpoint: process.env.S3_ENDPOINT,
          s3ForcePathStyle: process.env.S3_FORTH_PATH_STYLE === "true"
        }
      },
    },
    server: {
      host,
      protocol: process.env.PROTOCOL,
      // This MUST match the path you specify in `app.use()` below:
      path: path.join( __dirname, '../../../public' ),
    },
    redisUrl: process.env.USING_CACHE === "true" ? process.env.REDIS_URL : "",
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.JWT_KEY,
    filePath: path.join( __dirname, '../../../public' ),
    streamingUpload: process.env.S3_STREAMING_UPLOAD === "true",
    uploadUrls: [ process.env.S3_ENDPOINT ]
  };
};