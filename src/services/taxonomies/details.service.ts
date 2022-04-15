import { Taxonomy, TaxonomyDoc } from "models/taxonomies/taxonomy.model";
import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";

export async function taxonomyDetailsService (
  slug: string,
  imgProxyParams?: Omit<IImgProxyPrams, "key">
): Promise<WithImgProxyUrlType<TaxonomyDoc>> {
  const taxonomy = await Taxonomy.findOne( { slug } )
    .cache( CacheOptionServiceEnum.TAXONOMY );
  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  const imgProxySignedUrl = imgProxyParams?.resizingType && taxonomy.featuredImage?.path
    ? imgProxySignUrl( { ...imgProxyParams, key: taxonomy.featuredImage.path } )
    : "";
  return { ...taxonomy.toJSON<TaxonomyDoc>(), imgProxySignedUrl };
}