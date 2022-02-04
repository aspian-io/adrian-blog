import express from 'express';
import { adminPostCreateController } from '../controllers/admin-controllers/api/v1/posts/create.controller';
import { adminPostDeleteController } from '../controllers/admin-controllers/api/v1/posts/delete.controller';
import { adminPostDetailsController } from '../controllers/admin-controllers/api/v1/posts/details.controller';
import { adminPostEditController } from '../controllers/admin-controllers/api/v1/posts/edit.controller';
import { adminPostListController } from '../controllers/admin-controllers/api/v1/posts/list.controller';
import { postCreateSchema } from '../controllers/admin-controllers/api/v1/posts/validation-schemas/post-create.schema';
import { postEditSchema } from '../controllers/admin-controllers/api/v1/posts/validation-schemas/post-edit.schema';
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
  asyncHandler( adminPostListController )
);

// GET: Get a Post by its slug
postRouter.get(
  '/details/:slug',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_DETAILS, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler( adminPostDetailsController )
);

// POST: Create a Post
postRouter.post(
  '/create',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_CREATE, CorePolicies.CoreClaims_ADMIN ] ),
  postCreateSchema,
  validateRequest,
  asyncHandler( adminPostCreateController )
);

// PUT: Edit a Post
postRouter.put(
  '/edit/:slug',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_EDIT, CorePolicies.CoreClaims_ADMIN ] ),
  postEditSchema,
  validateRequest,
  asyncHandler( adminPostEditController )
);

// DELETE: Delete a Post
postRouter.delete(
  '/delete/:slug',
  requireAuth,
  authorize( [ PostPolicies.PostClaims_DELETE, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler( adminPostDeleteController )
);