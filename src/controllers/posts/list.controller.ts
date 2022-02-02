import { Request, Response } from "express";
import { logSerializer } from "../../helpers/log-serializer.helper";
import { PostLocaleEnum } from "../../locales/service-locale-keys/posts.locale";
import { postListService } from "../../services/posts/list.service";
import { logger } from "../../services/winston-logger/logger.service";

export async function postListController ( req: Request, res: Response ) {
  const posts = await postListService();
  res.send( posts );
  logger.info(
    "Post list has been retrieved successfully",
    logSerializer( req, res, PostLocaleEnum.INFO_LIST )
  );
}