import { AWSError, S3 } from "aws-sdk";
import { s3 } from "./s3.infra";

// S3 delete single object params
export interface IS3DeleteObject {
  Bucket: string;
  Key: string;
}

/**
 * 
 * Delete a single S3 object
 * 
 * @param {IS3DeleteObject} params - params of type `IS3DeleteObject` to delete a single S3 object
 * @returns {Promise<S3.DeleteObjectOutput>} - A Promise of type `S3.DeleteObjectOutput`
 */
export function s3DeleteObject ( params: IS3DeleteObject ): Promise<S3.DeleteObjectOutput> {
  const { Bucket, Key } = params;
  return new Promise(
    ( resolve: ( value: S3.DeleteObjectOutput ) => void, reject: ( reason?: AWSError ) => void ) => {
      s3.deleteObject( { Bucket, Key }, ( err, data ) => {
        if ( err ) {
          reject( err );
        } else {
          resolve( data );
        }
      } );
    }
  );
}

// S3 delete objects params
export interface IS3DeleteObjects {
  Bucket: string;
  Delete: IS3DeleteObjectsType;
}

// S3 delete multiple objects params
export interface IS3DeleteObjectsType {
  Objects: IS3DeleteSingleObjectType[];
  Quiet: boolean;
}

// S3 delete single object type
export interface IS3DeleteSingleObjectType {
  Key: string;
}

/**
 * 
 * Delete multiple S3 objects
 * 
 * @param {IS3DeleteObjects} params - Params of type `IS3DeleteObjects` to delete multiple S3 objects
 * @returns {Promise<S3.DeleteObjectOutput>} - A Promise of type `S3.DeleteObjectOutput`
 */
export function s3DeleteObjects ( params: IS3DeleteObjects ): Promise<S3.DeleteObjectsOutput> {
  const { Bucket, Delete } = params;
  return new Promise(
    (
      resolve: ( value: S3.DeleteObjectsOutput ) => void,
      reject: ( reason?: AWSError ) => void
    ) => {
      s3.deleteObjects( { Bucket, Delete }, ( err, data ) => {
        if ( err ) {
          reject( err );
        } else {
          resolve( data );
        }
      } );
    } );
}
