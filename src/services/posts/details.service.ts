import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { Post, PostStatusEnum, PostTypeEnum } from 'models/posts/post.model';


export async function postDetailsService ( slug: string ) {
  const post = await Post.findOne( { slug } )
    .populate( 'taxonomies' )
    .populate( 'attachments' )
    .cache( CacheOptionServiceEnum.POST );
  if ( !post ) throw new NotFoundError();
  return post;
}