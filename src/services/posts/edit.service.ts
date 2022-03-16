import { Post, PostAttrs, PostStatusEnum } from "models/posts/post.model";
import mongoose from 'mongoose';
import slugify from "slugify";
import { clearCache } from "infrastructure/cache/clear-cache";
import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { scheduledPostsQueueToArchive, scheduledPostsQueueToPublish } from "./post-queue.service";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";

export type PostEditService = Omit<PostAttrs, "createdBy" | "createdByIp" | "child">;

export async function postEditService ( data: PostEditService ) {
  const {
    slug, title, subtitle, excerpt, content, visibility,
    status, scheduledFor, scheduledExpiration, commentAllowed, viewCount, type,
    isPinned, parent, taxonomies, attachments,
    updatedBy, updatedByIp, userAgent
  } = data;

  if ( !mongoose.isValidObjectId( updatedBy ) ) {
    throw new BadRequestError( "User id must be a standard id", CoreLocaleEnum.ERROR_USER_ID );
  }

  const post = await Post.findOne( { slug } );
  if ( !post ) throw new NotFoundError();

  const duplicatePostTitles = await Post.find( { title } );
  if ( duplicatePostTitles.length ) {
    duplicatePostTitles.forEach( p => {
      if ( p.id !== post.id ) {
        throw new BadRequestError( "Duplicate post title is not allowed", PostLocaleEnum.ERROR_DUPLICATE_POST );
      }
    } );
  }

  const oldParent = post.parent ? post.parent.toString() : null;
  const parentDoc = parent ? await Post.findById( parent ) : null;
  if ( parent && !parentDoc ) {
    throw new BadRequestError( "Parent post not found", PostLocaleEnum.ERROR_PARENT_NOT_FOUND );
  }
  if ( parentDoc && parentDoc.child && parentDoc.child.toString() !== post.id ) {
    throw new BadRequestError(
      "The parent post has been taken and is not reusable",
      PostLocaleEnum.ERROR_DUPLICATE_PARENT
    );
  }

  const isScheduledForFuture = scheduledFor && new Date( scheduledFor ).getTime() > Date.now();
  const isScheduledToArchive = scheduledFor
    && scheduledExpiration
    && new Date( scheduledExpiration ).getTime() > new Date( scheduledFor ).getTime();
  const slugified = slugify( title );

  post.set( {
    title,
    subtitle,
    excerpt,
    content,
    visibility,
    slug: slugified,
    status: isScheduledForFuture ? PostStatusEnum.FUTURE : status,
    scheduledFor,
    commentAllowed,
    viewCount,
    type,
    isPinned,
    parent,
    taxonomies,
    attachments,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  await post.save( { session } );
  if ( isScheduledForFuture ) {
    await scheduledPostsQueueToPublish.add( {
      postId: post.id
    }, {
      delay: new Date( post.scheduledFor! ).getTime() - new Date().getTime()
    } );
  }
  if ( isScheduledToArchive ) {
    await scheduledPostsQueueToArchive.add( {
      postId: post.id
    }, {
      delay: new Date( post.scheduledExpiration! ).getTime() - Date.now()
    } );
  }
  if ( oldParent && oldParent !== parent ) {
    await Post.updateOne( { _id: oldParent }, { $unset: { child: "" } }, { session } );
  }
  if ( parentDoc ) {
    parentDoc.set( { child: post.id } );
    await parentDoc.save( { session } );
  }
  clearCache( CacheOptionServiceEnum.POST );

  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return post;
}