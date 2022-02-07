import { Post, PostAttrs, PostStatusEnum } from "../../models/posts/post.model";
import mongoose from 'mongoose';
import { BadRequestError } from "../../errors/bad-request-error";
import { CoreLocaleEnum } from "../../locales/service-locale-keys/core.locale";
import slugify from "slugify";
import { PostLocaleEnum } from "../../locales/service-locale-keys/posts.locale";
import { clearCache } from "../../infrastructure/cache/clear-cache.infra";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../infrastructure/cache/cache-options.infra";
import { scheduledPostsQueue } from "./post-queue.service";

export type IPostCreateService = Omit<PostAttrs, "slug">;

export async function postCreateService ( data: IPostCreateService ) {
  const {
    title, subtitle, excerpt, content, visibility,
    status, scheduledFor, commentAllowed, viewCount, type,
    isPinned, child, parent, taxonomies, attachments, postmeta,
    createdBy, createdByIp, updatedBy, updatedByIp, userAgent
  } = data;

  if ( !mongoose.isValidObjectId( createdBy ) || !mongoose.isValidObjectId( updatedBy ) ) {
    throw new BadRequestError( "User id must be a standard id", CoreLocaleEnum.ERROR_USER_ID );
  }
  const isDuplicated = await Post.find( { title } );
  if ( isDuplicated.length ) {
    throw new BadRequestError( "Duplicate post is not allowed", PostLocaleEnum.ERROR_DUPLICATE_POST );
  }
  const slug = slugify( title );
  const isScheduled = scheduledFor && new Date(scheduledFor!).getTime() > Date.now();

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
    child,
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

  await post.save();

  if ( isScheduled ) {
    await scheduledPostsQueue.add( {
      postId: post.id
    }, {
      delay: new Date( post.scheduledFor! ).getTime() - new Date().getTime()
    } );
  }
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
  return post;
}