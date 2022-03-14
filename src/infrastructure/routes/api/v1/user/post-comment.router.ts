import { postCommentCreateController } from 'controllers/user-controllers/api/v1/post-comments/create.controller';
import { postCommentListController } from 'controllers/user-controllers/api/v1/post-comments/list.controller';
import { postCommentLikeController } from 'controllers/user-controllers/api/v1/post-comments/like.controller';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { postCommentCreateSchema } from 'controllers/admin-controllers/api/v1/post-comments/validation-schemas/comment-create.schema';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';

export const postCommentRouter = express.Router();

// GET: Get comments list of a post
postCommentRouter.get(
  '/list-by-post/:postId',
  asyncHandler( postCommentListController )
);

// POST: Create a comment
postCommentRouter.post(
  '/create',
  requireAuth,
  postCommentCreateSchema,
  validateRequest,
  asyncHandler( postCommentCreateController )
);

// PUT: Like/unlike a comment
postCommentRouter.put(
  '/like-comment/:id',
  requireAuth,
  asyncHandler( postCommentLikeController )
);