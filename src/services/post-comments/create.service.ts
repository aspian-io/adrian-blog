import mongoose from 'mongoose';
import { Comment } from 'models/post-comments/post-comment.model';
import { BadRequestError } from 'errors/bad-request-error';
import { CommentLocaleEnum } from 'locales/service-locale-keys/post-comment.locale';
import { postCommentProcessor } from './helper/comment-processor.helper';
import { clearCache } from 'infrastructure/cache/clear-cache.infra';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from 'infrastructure/cache/cache-options.infra';

export interface IPostCommentCreateService {
  title: string;
  content: string;
  parent?: string;
  post: string;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export async function postCommentCreateService ( data: IPostCommentCreateService ) {
  const { title, content, parent, post, createdBy, createdByIp, userAgent } = data;
  const allowedReplyLevel = parseInt( process.env.POSTCOMMENT_REPLY_ALLOWED_LEVEL! );

  const {
    sanitizedTitle,
    sanitizedContent,
    isApproved
  } = await postCommentProcessor( { title, content } );

  const parentComment = mongoose.isValidObjectId( parent )
    ? await Comment.findById( parent )
    : null;


  const isReplyLevelAllowed = parentComment ? ( parentComment.replyLevel + 1 ) <= allowedReplyLevel : true;
  if ( !isReplyLevelAllowed ) throw new BadRequestError( "Reply is now allowed", CommentLocaleEnum.ERROR_REPLY_NOT_ALLOWED );

  const postComment = Comment.build( {
    title: sanitizedTitle,
    content: sanitizedContent,
    parent,
    isApproved,
    replyLevel: parentComment ? ( parentComment.replyLevel + 1 ) : 0,
    isReplyAllowed: parentComment ? ( parentComment.replyLevel + 1 ) < allowedReplyLevel : true,
    post,
    createdBy,
    createdByIp,
    userAgent
  } );

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  await postComment.save( { session } );
  if ( parentComment ) {
    parentComment.set( {
      replies: parentComment.replies ? [ ...parentComment.replies, postComment.id ] : [ postComment.id ]
    } );
    await parentComment.save( { session } );
  }
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST_COMMENT_SETTINGS );

  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return postComment;
}