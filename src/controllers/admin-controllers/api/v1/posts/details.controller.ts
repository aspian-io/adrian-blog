import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { PostLocaleEnum } from "../../../../../locales/service-locale-keys/posts.locale";
import { postDetailsService } from "../../../../../services/posts/details.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminPostDetailsController ( req: Request, res: Response ) {
  const post = await postDetailsService( req.params.slug );
  res.send( post );
  logger.info(
    "Post details has been retrieved successfully",
    logSerializer( req, res, PostLocaleEnum.INFO_DETAILS, post.title )
  );
}