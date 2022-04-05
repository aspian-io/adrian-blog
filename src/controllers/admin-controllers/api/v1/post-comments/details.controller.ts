import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { postCommentDetailsService } from "services/post-comments/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminPostCommentDetailsController ( req: Request, res: Response ) {
  const comment = await postCommentDetailsService( req.params.id, { ...req.query as Omit<IImgProxyPrams, "key"> } );
  res.send( comment );
  logger.info(
    `Post comment details retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, CommentLocaleEnum.INFO_DETAILS, {
      postComment: {
        id: comment.id
      }
    } )
  );
}