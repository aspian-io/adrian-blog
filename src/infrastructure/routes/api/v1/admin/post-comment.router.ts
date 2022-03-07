import express from 'express';
import { adminPostCommentApproveController } from 'controllers/admin-controllers/api/v1/post-comments/approve.controller';
import { adminPostCommentCreateController } from 'controllers/admin-controllers/api/v1/post-comments/create.controller';
import { adminPostCommentDeleteController } from 'controllers/admin-controllers/api/v1/post-comments/delete.controller';
import { adminPostCommentDetailsController } from 'controllers/admin-controllers/api/v1/post-comments/details.controller';
import { adminPostCommentEditController } from 'controllers/admin-controllers/api/v1/post-comments/edit.controller';
import { adminPostCommentListController } from 'controllers/admin-controllers/api/v1/post-comments/list.controller';
import { postCommentCreateSchema } from 'controllers/admin-controllers/api/v1/post-comments/validation-schemas/comment-create.schema';
import { postCommentEditSchema } from 'controllers/admin-controllers/api/v1/post-comments/validation-schemas/comment-edit.schema';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';

export const adminPostCommentRouter = express.Router();

// GET: List of Post Comments
adminPostCommentRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentListController )
);

// GET: Get a Post Comment by its slug
adminPostCommentRouter.get(
  '/details/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_DETAILS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentDetailsController )
);

// POST: Create a Post Comment
adminPostCommentRouter.post(
  '/create',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  postCommentCreateSchema,
  validateRequest,
  asyncHandler( adminPostCommentCreateController )
);

// PUT: Edit a Post Comment
adminPostCommentRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_EDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  postCommentEditSchema,
  validateRequest,
  asyncHandler( adminPostCommentEditController )
);

// DELETE: Delete a Post Comment
adminPostCommentRouter.delete(
  '/delete/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_DELETE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentDeleteController )
);

// PUT: Approve a comment
adminPostCommentRouter.put(
  '/approval/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_APPROVE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentApproveController )
);