import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Comment } from "models/post-comments/post-comment.model";
import { postCommentProcessor } from "./helper/comment-processor.helper";

export interface IPostCommentEditService {
  id: string;
  title: string;
  content: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function postCommentEditService ( data: IPostCommentEditService ) {
  const { id, title, content, updatedBy, updatedByIp, userAgent } = data;
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  const {
    sanitizedTitle,
    sanitizedContent,
    isApproved
  } = await postCommentProcessor( { title, content } );

  comment.set( {
    title: sanitizedTitle,
    content: sanitizedContent,
    isApproved,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await comment.save();
  clearCache( CacheOptionServiceEnum.POST_COMMENT );

  return comment;
}