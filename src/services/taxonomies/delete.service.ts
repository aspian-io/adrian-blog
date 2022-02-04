import { NotFoundError } from '../../errors/not-found-error';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from '../../infrastructure/mongoose-extensions/cache/cache-options.infra';
import { clearCache } from '../../infrastructure/mongoose-extensions/cache/clear-cache.infra';
import { Taxonomy } from '../../models/taxonomy.model';

export async function taxonomyDeleteService ( slug: string ) {
  const taxonomy = await Taxonomy.findOne( { slug } );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  await taxonomy.delete();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.TAXONOMY );
  return taxonomy;
}