import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { IImgProxyPrams, imgProxySignUrl } from 'infrastructure/imgproxy/sign-url';
import { WithImgProxyUrlType } from 'infrastructure/imgproxy/type';
import { Post, PostDoc, PostTypeEnum } from 'models/posts/post.model';


export async function postDetailsService (
  slug: string,
  type?: PostTypeEnum,
  imgProxyParams?: Omit<IImgProxyPrams, "key">
): Promise<WithImgProxyUrlType<PostDoc>> {
  const post = await Post.findOne( { slug, type } )
    .populate( 'featuredImage' )
    .populate( 'taxonomies' )
    .populate( 'attachments' );
  if ( !post ) throw new NotFoundError();
  post.viewCount += 1;
  await post.save();

  const imgProxySignedUrl = imgProxyParams?.resizingType && post.featuredImage?.path
    ? imgProxySignUrl( { ...imgProxyParams, key: post.featuredImage.path } )
    : "";
  return { ...post.toJSON<PostDoc>(), imgProxySignedUrl };
}