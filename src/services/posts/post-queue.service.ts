import Queue from 'bull';
import chalk from 'chalk';
import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { Post, PostStatusEnum } from 'models/posts/post.model';

interface Payload {
  postId: string;
}

const scheduledPostsQueueToPublish = new Queue<Payload>( 'post:publish', process.env.REDIS_URL! );

scheduledPostsQueueToPublish.process( async ( job ) => {
  const post = await Post.findById( job.data.postId );
  if ( post ) {
    post.set( {
      status: PostStatusEnum.PUBLISH
    } );

    await post.save();
    clearCache( CacheOptionServiceEnum.POST );
    console.log(
      chalk.bold.green.inverse( " Queue Info " ),
      chalk.bold.green( `A scheduled post with the id of ${ post.id } published successfully` )
    );
  };
} );

const scheduledPostsQueueToArchive = new Queue<Payload>( 'post:archive', process.env.REDIS_URL! );

scheduledPostsQueueToArchive.process( async ( job ) => {
  const post = await Post.findById( job.data.postId );
  if ( post ) {
    post.set( {
      status: PostStatusEnum.ARCHIVE
    } );

    await post.save();
    clearCache( CacheOptionServiceEnum.POST );
    console.log(
      chalk.bold.green.inverse( " Queue Info " ),
      chalk.bold.green( `A scheduled post with the id of ${ post.id } archived successfully` )
    );
  };
} );

export { scheduledPostsQueueToPublish, scheduledPostsQueueToArchive };