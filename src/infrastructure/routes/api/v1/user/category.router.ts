import { taxonomyCategoryListController } from 'controllers/user-controllers/api/v1/taxonomies/categories/list.controller';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const categoryRouter = express.Router();

// GET: Get categories
categoryRouter.get( '/', asyncHandler( taxonomyCategoryListController ) );