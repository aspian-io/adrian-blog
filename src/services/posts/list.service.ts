import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { Post } from "models/posts/post.model";

export async function postListService () {
  const posts = await Post.find().sort( { createdAt: "desc" } ).cache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
  return posts;
}