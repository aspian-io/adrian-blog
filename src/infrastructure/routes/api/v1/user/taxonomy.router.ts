import { taxonomyCategoryListController } from 'controllers/user-controllers/api/v1/taxonomies/categories/list.controller';
import { taxonomyMenuItemsController } from 'controllers/user-controllers/api/v1/taxonomies/menu/list.controller';
import { taxonomyTagsController } from 'controllers/user-controllers/api/v1/taxonomies/tags/list.controller';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const taxonomyRouter = express.Router();

// GET: Get categories
taxonomyRouter.get( '/categories', asyncHandler( taxonomyCategoryListController ) );
// GET: Get tags
taxonomyRouter.get( '/tags', asyncHandler( taxonomyTagsController ) );
// GET: Get menu items
taxonomyRouter.get( '/menu-items', asyncHandler( taxonomyMenuItemsController ) );