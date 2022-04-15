import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { PostCommentDto } from "services/post-comments/DTOs/post-comment.dto";
import { postCommentListService } from "services/post-comments/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function postCommentListController ( req: Request, res: Response ) {
  const comments = await postCommentListService( {
    preDefinedFilters: [ {
      filterBy: "post",
      filterParam: req.params.postId
    }, {
      filterBy: "isApproved",
      filterParam: true
    } ],
    preDefinedOrders: [ {
      orderBy: "numLikes",
      orderParam: -1
    }, {
      orderBy: "createdAt",
      orderParam: -1
    } ],
    fieldsToPopulate: {
      path: "createdBy",
      populate: {
        path: "avatar"
      }
    },
    dataMapTo: PostCommentDto,
    imgProxyParams: { ...req.query as Omit<IImgProxyPrams, "key"> }
  } );

  res.send( comments );
  logger.info(
    "Comments list of a post retrieved successfully",
    logSerializer( req, res, CommentLocaleEnum.INFO_LIST )
  );
}