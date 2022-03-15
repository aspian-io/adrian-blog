import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { Post, PostTypeEnum } from 'models/posts/post.model';


export async function postDetailsService ( slug: string, type?: PostTypeEnum ) {
  const post = await Post.findOne( { slug, type } )
    .populate( 'taxonomies' )
    .populate( 'attachments' );
  if ( !post ) throw new NotFoundError();
  post.viewCount += 1;
  await post.save();
  return post;
}