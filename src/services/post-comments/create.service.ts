import mongoose from 'mongoose';
import { Comment, CommentDoc } from 'models/post-comments/post-comment.model';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { postCommentProcessor } from './helper/comment-processor.helper';
import { BadRequestError } from 'infrastructure/errors/bad-request-error';
import { CommentLocaleEnum } from 'infrastructure/locales/service-locale-keys/post-comment.locale';

export interface IPostCommentCreateService {
  title: string;
  content: string;
  parent?: string;
  post: string;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export interface IPostCommentCreateResult {
  metadata: IPostCommentCreateResultMetadata;
  data: CommentDoc;
}

export interface IPostCommentCreateResultMetadata {
  isApproved: boolean;
  allowedReplyLevel: number;
  currentReplyLevel: number;
}

export async function postCommentCreateService ( data: IPostCommentCreateService ): Promise<IPostCommentCreateResult> {
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
  const currentReplyLevel = parentComment ? ( parentComment.replyLevel + 1 ) : 0;

  const postComment = Comment.build( {
    title: sanitizedTitle,
    content: sanitizedContent,
    parent,
    isApproved,
    replyLevel: currentReplyLevel,
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
  clearCache( CacheOptionServiceEnum.POST_COMMENT );

  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return {
    metadata: {
      isApproved,
      allowedReplyLevel,
      currentReplyLevel
    },
    data: postComment
  };
}