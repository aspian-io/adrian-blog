import { taxonomyMenuItemsController } from 'controllers/user-controllers/api/v1/taxonomies/menu/list.controller';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const menuItemRouter = express.Router();

// GET: Get menu items
menuItemRouter.get( '/', asyncHandler( taxonomyMenuItemsController ) );