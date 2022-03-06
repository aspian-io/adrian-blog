import { Post, PostAttrs, PostStatusEnum } from "models/posts/post.model";
import mongoose from 'mongoose';
import slugify from "slugify";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { scheduledPostsQueue } from "./post-queue.service";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";

export type IPostCreateService = Omit<PostAttrs, "slug" | "child">;

export async function postCreateService ( data: IPostCreateService ) {
  const {
    title, subtitle, excerpt, content, visibility,
    status, scheduledFor, commentAllowed, viewCount, type,
    isPinned, parent, taxonomies, attachments, postmeta,
    createdBy, createdByIp, updatedBy, updatedByIp, userAgent
  } = data;

  if ( !mongoose.isValidObjectId( createdBy ) ) {
    throw new BadRequestError( "User id must be a standard id", CoreLocaleEnum.ERROR_USER_ID );
  }
  const isDuplicated = await Post.find( { title } );
  if ( isDuplicated.length ) {
    throw new BadRequestError( "Duplicate post is not allowed", PostLocaleEnum.ERROR_DUPLICATE_POST );
  }
  const slug = slugify( title );
  const isScheduled = scheduledFor && new Date( scheduledFor! ).getTime() > Date.now();
  const parentPost = parent ? await Post.findById( parent ) : null;
  if ( parent && !parentPost ) {
    throw new BadRequestError( "Parent post not found", PostLocaleEnum.ERROR_PARENT_NOT_FOUND );
  }
  if ( parentPost && parentPost.child ) {
    throw new BadRequestError(
      "The parent post has been taken and is not reusable",
      PostLocaleEnum.ERROR_DUPLICATE_PARENT
    );
  }

  const post = Post.build( {
    title,
    subtitle,
    excerpt,
    content,
    visibility,
    status: isScheduled ? PostStatusEnum.FUTURE : status,
    scheduledFor,
    slug,
    commentAllowed,
    viewCount,
    type,
    isPinned,
    parent,
    taxonomies,
    attachments,
    postmeta,
    createdBy,
    createdByIp,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  await post.save( { session } );
  if ( isScheduled ) {
    await scheduledPostsQueue.add( {
      postId: post.id
    }, {
      delay: new Date( post.scheduledFor! ).getTime() - new Date().getTime()
    } );
  }
  if ( parentPost ) {
    parentPost.set( { child: post.id } );
    await parentPost.save( { session } );
  }
  clearCache( CacheOptionServiceEnum.POST );

  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return post;
}