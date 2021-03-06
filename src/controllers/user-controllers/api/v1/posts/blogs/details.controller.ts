import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { PostTypeEnum } from "models/posts/post.model";
import { postDetailsService } from "services/posts/details.service";
import { PostDto } from "services/posts/DTOs/post.dto";
import { postListService } from "services/posts/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function postBlogDetailsController ( req: Request, res: Response ) {
  const blog = await postDetailsService(
    req.params.slug,
    PostTypeEnum.BLOG,
    { ...req.query as Omit<IImgProxyPrams, "key"> }
  );
  const taxonomies = blog.taxonomies!.map<string>( t => t.id );
  const relatedBlogs = await postListService( {
    preDefinedFilters: [ {
      filterBy: "taxonomies",
      filterParam: taxonomies
    } ],
    preDefinedOrders: [ {
      orderBy: "createdAt",
      orderParam: -1,
    }, {
      orderBy: "updatedAt",
      orderParam: -1
    } ],
    dataMapTo: PostDto,
    imgProxyParams: { ...req.query as Omit<IImgProxyPrams, "key"> }
  } );
  const postDto = dtoMapper( blog, PostDto );
  res.send( {
    blog: postDto,
    relatedBlogs
  } );
  logger.info(
    `${ blog.title } (blog) details retrieved successfully`,
    logSerializer( req, res, PostLocaleEnum.INFO_USERAREA_BLOG_DETAILS, {
      post: {
        id: blog.id
      }
    } )
  );
}