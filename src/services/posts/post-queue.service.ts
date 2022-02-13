import Queue from 'bull';
import chalk from 'chalk';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from 'infrastructure/cache/cache-options.infra';
import { clearCache } from 'infrastructure/cache/clear-cache.infra';
import { Post, PostStatusEnum } from 'models/posts/post.model';

interface Payload {
  postId: string;
}

const scheduledPostsQueue = new Queue<Payload>( 'post:scheduled', process.env.REDIS_URL! );

scheduledPostsQueue.process( async ( job ) => {
  const post = await Post.findById( job.data.postId );
  if ( post ) {
    post.set( {
      status: PostStatusEnum.PUBLISH
    } );

    await post.save();
    clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
    console.log(
      chalk.bold.green.inverse( " Queue Info " ),
      chalk.bold.green( `A scheduled post with the id of ${ post.id } published successfully` )
    );
  };
} );

export { scheduledPostsQueue };