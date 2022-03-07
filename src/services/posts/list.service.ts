import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { Post } from "models/posts/post.model";

export async function postListService () {
  const posts = await Post.find().sort( { createdAt: "desc" } ).cache( CacheOptionServiceEnum.POST );
  return posts;
}