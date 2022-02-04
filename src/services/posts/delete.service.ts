import { NotFoundError } from '../../errors/not-found-error';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from '../../infrastructure/mongoose-extensions/cache/cache-options.infra';
import { clearCache } from '../../infrastructure/mongoose-extensions/cache/clear-cache.infra';
import { Post } from '../../models/post.model';

export async function postDeleteService ( slug: string ) {
  const post = await Post.findOne( { slug } );
  if ( !post ) throw new NotFoundError();
  await post.delete();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
  return post;
}