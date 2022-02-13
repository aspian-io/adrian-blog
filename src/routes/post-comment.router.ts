import express from 'express';
import { adminPostCommentApproveController } from 'controllers/admin-controllers/api/v1/post-comments/approve.controller';
import { adminPostCommentCreateController } from 'controllers/admin-controllers/api/v1/post-comments/create.controller';
import { adminPostCommentDeleteController } from 'controllers/admin-controllers/api/v1/post-comments/delete.controller';
import { adminPostCommentDetailsController } from 'controllers/admin-controllers/api/v1/post-comments/details.controller';
import { adminPostCommentEditController } from 'controllers/admin-controllers/api/v1/post-comments/edit.controller';
import { adminPostCommentListController } from 'controllers/admin-controllers/api/v1/post-comments/list.controller';
import { adminPostCommentSettingEditController } from 'controllers/admin-controllers/api/v1/post-comments/settings/edit.controller';
import { adminPostCommentSettingsListController } from 'controllers/admin-controllers/api/v1/post-comments/settings/list.controller';
import { postCommentSettingsEditSchema } from 'controllers/admin-controllers/api/v1/post-comments/settings/validation-schemas/comment-settings-edit.schema';
import { postCommentCreateSchema } from 'controllers/admin-controllers/api/v1/post-comments/validation-schemas/comment-create.schema';
import { postCommentEditSchema } from 'controllers/admin-controllers/api/v1/post-comments/validation-schemas/comment-edit.schema';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';
import { asyncHandler } from 'middleware/async-handler.middleware';
import { authorize } from 'middleware/authorize.middleware';
import { requireAuth } from 'middleware/require-auth.middleware';
import { validateRequest } from 'middleware/validate-request.middleware';

export const postCommentRouter = express.Router();

// GET: List of Post Comments
postCommentRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentListController )
);

// GET: Get a Post Comment by its slug
postCommentRouter.get(
  '/details/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_DETAILS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentDetailsController )
);

// POST: Create a Post Comment
postCommentRouter.post(
  '/create',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  postCommentCreateSchema,
  validateRequest,
  asyncHandler( adminPostCommentCreateController )
);

// PUT: Edit a Post Comment
postCommentRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_EDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  postCommentEditSchema,
  validateRequest,
  asyncHandler( adminPostCommentEditController )
);

// DELETE: Delete a Post Comment
postCommentRouter.delete(
  '/delete/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_DELETE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentDeleteController )
);

// PUT: Edit a Post Comment Setting
postCommentRouter.put(
  '/edit-settings/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_SETTINGS_EDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  postCommentSettingsEditSchema,
  validateRequest,
  asyncHandler( adminPostCommentSettingEditController )
);

// GET: List of Post Comments Settings
postCommentRouter.get(
  '/settings',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_SETTINGS_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentSettingsListController )
);

// PUT: Approve a comment
postCommentRouter.put(
  '/approval/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.PostComment_APPROVE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminPostCommentApproveController )
);