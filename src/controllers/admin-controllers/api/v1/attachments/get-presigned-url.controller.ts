import { Request, Response } from "express";
import { s3 } from "../../../../../infrastructure/s3/s3.infra";

export async function adminGetPresignedUrlController ( req: Request, res: Response ) {

  const clientParams = {
    Bucket: process.env.S3_PRIVATE_BUCKET,
    Key: `file.png`,
  };

  const url = s3.getSignedUrl( 'getObject', {
    Bucket: process.env.S3_PRIVATE_BUCKET,
    Key: "user/scr1-2022-01-17_14.46.17.mp4",
    Expires: 3600
  } );


  console.log( `download url: ${ url }` );
  res.send( url );
}