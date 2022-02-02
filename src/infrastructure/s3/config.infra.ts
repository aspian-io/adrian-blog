import path from "path";
import { sanitize } from 'string-sanitizer';
import { BadRequestError } from "../../errors/bad-request-error";
import { isFileTypeAllowed } from "../security/filetype-allowed.infra";

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
// Filename Generator
const fileNameGenerator = ( metadata: any, allowedMimeTypes: string[] ) => {
  if ( !metadata.userId || !metadata.userEmail ) throw new BadRequestError( "Forbidden" );
  const rawFileName = path.parse( metadata.name ).name;
  const fileExt = path.parse( metadata.name ).ext;
  const userEmailParts = metadata.userEmail.split( '@' );
  const username = userEmailParts[ 0 ];
  // Sanitizing 
  const sanitizedFileName = sanitize.addUnderscore( rawFileName );
  const sanitizedUsername = sanitize.addUnderscore( username );
  // Check for file type 
  const isTypeAllowed = isFileTypeAllowed( metadata.type, allowedMimeTypes );
  if ( !isTypeAllowed ) throw new BadRequestError( "File type not allowed" );
  // Compute full filename
  const fullFileName = `${ sanitizedUsername }_${ metadata.userId }/${ sanitizedFileName }_${ Date.now() }${ fileExt }`;
  return fullFileName;
};

// S3 Private Bucket Params
const s3BucketConfig = ( expiresInSeconds: number, allowedMimeTypes: string[] ) => {
  return {
    providerOptions: {
      s3: {
        getKey: ( req: any, filename: any, metadata: any ) => fileNameGenerator( metadata, allowedMimeTypes ),
        key: process.env.S3_ACCESS_KEY!,
        secret: process.env.S3_SECRET_KEY!,
        bucket: process.env.S3_BUCKET!,
        region: process.env.S3_REGION,
        useAccelerateEndpoint: false, // default: false,
        expires: expiresInSeconds, // default: 300 (5 minutes)
        acl: process.env.S3_ACL, // default: public-read
        awsClientOptions: {
          endpoint: process.env.S3_ENDPOINT,
          s3ForcePathStyle: process.env.S3_FORTH_PATH_STYLE
        }
      },
    },
    server: {
      host,
      protocol: process.env.PROTOCOL,
      // This MUST match the path you specify in `app.use()` below:
      path: process.env.S3_UPLOAD_PATH,
    },
    redisUrl: process.env.USING_CACHE ? process.env.REDIS_URL : "",
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.JWT_KEY,
    filePath: path.join( __dirname, '../../../public' ),
    streamingUpload: process.env.S3_STREAMING_UPLOAD,
    uploadUrls: [ process.env.S3_ENDPOINT ]
  };
};