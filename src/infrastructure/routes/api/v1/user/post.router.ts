import { postBannerListController } from 'controllers/user-controllers/api/v1/posts/banners/list.controller';
import { postBlogDetailsController } from 'controllers/user-controllers/api/v1/posts/blogs/details.controller';
import { postBlogsByTaxonomyController } from 'controllers/user-controllers/api/v1/posts/blogs/list-by-taxonomy.controller';
import { postBlogListController } from 'controllers/user-controllers/api/v1/posts/blogs/list.controller';
import { postNewsDetailsController } from 'controllers/user-controllers/api/v1/posts/news/details.controller';
import { postNewsListController } from 'controllers/user-controllers/api/v1/posts/news/list.controller';
import { postPageDetailsController } from 'controllers/user-controllers/api/v1/posts/pages/datails.controller';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const postRouter = express.Router();

// GET: Get all blogs
postRouter.get(
  '/blogs',
  asyncHandler( postBlogListController )
);

// GET: Get a blog details
postRouter.get(
  '/blogs/:slug',
  asyncHandler( postBlogDetailsController )
);

// GET: Get all blogs by category
postRouter.get(
  '/:taxonomySlug/blogs',
  asyncHandler( postBlogsByTaxonomyController )
);

// GET: Get all banners
postRouter.get(
  '/banners',
  asyncHandler( postBannerListController )
);

// GET: Get all news
postRouter.get(
  '/news',
  asyncHandler( postNewsListController )
);

// GET: Get news post details
postRouter.get(
  '/news/:slug',
  asyncHandler( postNewsDetailsController )
);

// GET: Get a page details
postRouter.get(
  '/pages/:slug',
  asyncHandler( postPageDetailsController )
);