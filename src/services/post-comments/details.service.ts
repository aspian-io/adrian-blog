import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { Comment, CommentDoc } from "models/post-comments/post-comment.model";

export async function postCommentDetailsService (
  id: string,
  imgProxyParams?: Omit<IImgProxyPrams, "key">
): Promise<WithImgProxyUrlType<CommentDoc>> {
  const comment = await Comment.findById( id )
    .populate( {
      path: "createdBy",
      populate: {
        path: "avatar"
      }
    } )
    .populate( 'likes' )
    .populate( 'numLikes' )
    .cache( CacheOptionServiceEnum.POST_COMMENT );
  if ( !comment ) throw new NotFoundError();

  const imgProxySignedUrl = imgProxyParams?.resizingType && comment.createdBy.avatar
    ? imgProxySignUrl( { ...imgProxyParams, key: comment.createdBy.avatar.path } )
    : "";

  return { ...comment.toJSON<CommentDoc>(), imgProxySignedUrl };
}