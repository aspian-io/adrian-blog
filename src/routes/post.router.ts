import express from 'express';
import { postCreateController } from '../controllers/posts/create.controller';
import { postDeleteController } from '../controllers/posts/delete.controller';
import { postDetailsController } from '../controllers/posts/details.controller';
import { postEditController } from '../controllers/posts/edit.controller';
import { postListController } from '../controllers/posts/list.controller';
import { postCreateSchema } from '../controllers/posts/validation-schemas/post-create.schema';
import { postEditSchema } from '../controllers/posts/validation-schemas/post-edit.schema';
import { asyncHandler } from '../middleware/async-handler.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { requireAuth } from '../middleware/require-auth.middleware';
import { validateRequest } from '../middleware/validate-request.middleware';
import { CorePolicies } from '../models/enums/core-policies.enum';
import { PostPolicies } from '../models/enums/post-policies.enum';

export const postRouter = express.Router();

// GET: List of Posts
postRouter.get(
  '/',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_LIST, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler( postListController )
);

// GET: Get a Post by its slug
postRouter.get(
  '/details/:slug',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_DETAILS, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler( postDetailsController )
);

// POST: Create a Post
postRouter.post(
  '/create',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_CREATE, CorePolicies.CoreClaims_ADMIN ] ),
  postCreateSchema,
  validateRequest,
  asyncHandler( postCreateController )
);

// PUT: Edit a Post
postRouter.put(
  '/edit/:slug',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_EDIT, CorePolicies.CoreClaims_ADMIN ] ),
  postEditSchema,
  validateRequest,
  asyncHandler( postEditController )
);

// DELETE: Delete a Post
postRouter.delete(
  '/delete/:slug',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_DELETE, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler( postDeleteController )
);