import { postBannerListController } from 'controllers/user-controllers/api/v1/posts/banners/list.controller';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const postRouter = express.Router();

postRouter.get(
  '/banners',
  asyncHandler( postBannerListController )
);