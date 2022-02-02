import { Post, PostAttrs } from "../../models/post.model";
import mongoose from 'mongoose';
import { BadRequestError } from "../../errors/bad-request-error";
import { CoreLocaleEnum } from "../../locales/service-locale-keys/core.locale";
import slugify from "slugify";
import { PostLocaleEnum } from "../../locales/service-locale-keys/posts.locale";
import { clearCache } from "../../infrastructure/cache/clear-cache.infra";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../infrastructure/cache/cache-options.infra";

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

  const post = Post.build( {
    title, subtitle, excerpt, content, visibility,
    status, scheduledFor, slug, commentAllowed, viewCount, type,
    isPinned, child, parent, taxonomies, attachments, postmeta,
    createdBy, createdByIp, updatedBy, updatedByIp, userAgent
  } );

  await post.save();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
  return post;
}