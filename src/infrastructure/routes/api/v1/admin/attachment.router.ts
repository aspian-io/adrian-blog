import express from "express";
import companion from '@uppy/companion';
import { adminGetPresignedUrlController } from "controllers/admin-controllers/api/v1/attachments/get-presigned-url.controller";
import { AccessPoliciesEnum } from "infrastructure/security/access-policies.enum";
import { getS3ConfigParams } from "infrastructure/s3/config";
import { adminAttachmentCreateController } from "controllers/admin-controllers/api/v1/attachments/create.controller";
import { adminAttachmentEditController } from "controllers/admin-controllers/api/v1/attachments/edit.controller";
import { adminAttachmentDeleteController } from "controllers/admin-controllers/api/v1/attachments/delete.controller";
import { adminAttachmentDeleteManyController } from "controllers/admin-controllers/api/v1/attachments/delete-many.controller";
import { adminAttachmentListController } from "controllers/admin-controllers/api/v1/attachments/list.controller";
import { adminAttachmentDetailsController } from "controllers/admin-controllers/api/v1/attachments/details.controller";
import { requireAuth } from "infrastructure/middleware/require-auth.middleware";
import { authorize } from "infrastructure/middleware/authorize.middleware";
import { asyncHandler } from "infrastructure/middleware/async-handler.middleware";

export const adminAttachmentRouter = express.Router();

// GET: Get attachment list
adminAttachmentRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAttachmentListController )
);

// Uppy upload functionality using Uppy Companion plugin
adminAttachmentRouter.use(
  '/upload',
  // requireAuth,
  // authorize( [ AccessPoliciesEnum.Attachment_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  companion.app( getS3ConfigParams( 5 * 60 * 60 ) )
);

// POST: Save uploaded file info
adminAttachmentRouter.post(
  '/create',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAttachmentCreateController )
);

// PUT: Edit uploaded file info
adminAttachmentRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_EDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAttachmentEditController )
);

// GET: Get uploaded file info
adminAttachmentRouter.get(
  '/details/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_DETAILS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAttachmentDetailsController )
);

// DELETE: Delete a file
adminAttachmentRouter.delete(
  '/delete/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_DELETE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAttachmentDeleteController )
);

// DELETE: Delete multiple files
adminAttachmentRouter.delete(
  '/delete-many',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_DELETE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAttachmentDeleteManyController )
);

// GET: Get a presigned URL to access a private file
adminAttachmentRouter.get(
  '/get-presigned-url/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_PRESIGNED, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminGetPresignedUrlController )
);