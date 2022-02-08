import { NotFoundError } from '../../errors/not-found-error';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from '../../infrastructure/cache/cache-options.infra';
import { clearCache } from '../../infrastructure/cache/clear-cache.infra';
import { Post } from '../../models/posts/post.model';

export async function postDeleteService ( slug: string ) {
  const post = await Post.findOne( { slug } );
  if ( !post ) throw new NotFoundError();
  await Post.updateMany( { parent: post.id }, { $unset: { parent: "" } } );
  await Post.updateMany( { child: post.id }, { $unset: { child: "" } } );
  await post.delete();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
  return post;
}