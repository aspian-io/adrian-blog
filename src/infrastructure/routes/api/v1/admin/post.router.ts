import express from 'express';
import { adminPostCreateController } from 'controllers/admin-controllers/api/v1/posts/create.controller';
import { adminPostDeleteController } from 'controllers/admin-controllers/api/v1/posts/delete.controller';
import { adminPostDetailsController } from 'controllers/admin-controllers/api/v1/posts/details.controller';
import { adminPostEditController } from 'controllers/admin-controllers/api/v1/posts/edit.controller';
import { adminPostListController } from 'controllers/admin-controllers/api/v1/posts/list.controller';
import { postCreateSchema } from 'controllers/admin-controllers/api/v1/posts/validation-schemas/post-create.schema';
import { postEditSchema } from 'controllers/admin-controllers/api/v1/posts/validation-schemas/post-edit.schema';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';

export const adminPostRouter = express.Router();

// GET: List of Posts
adminPostRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Post_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostListController )
);

// GET: Get a Post by its slug
adminPostRouter.get(
  '/details/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Post_DETAILS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostDetailsController )
);

// POST: Create a Post
adminPostRouter.post(
  '/create',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Post_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  postCreateSchema,
  validateRequest,
  asyncHandler( adminPostCreateController )
);

// PUT: Edit a Post
adminPostRouter.put(
  '/edit/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Post_EDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  postEditSchema,
  validateRequest,
  asyncHandler( adminPostEditController )
);

// DELETE: Delete a Post
adminPostRouter.delete(
  '/delete/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Post_DELETE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostDeleteController )
);