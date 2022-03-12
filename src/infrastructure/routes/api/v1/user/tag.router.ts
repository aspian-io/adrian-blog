import { taxonomyTagsController } from 'controllers/user-controllers/api/v1/taxonomies/tags/list.controller';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const tagRouter = express.Router();

// GET: Get tags
tagRouter.get( '/', asyncHandler( taxonomyTagsController ) );