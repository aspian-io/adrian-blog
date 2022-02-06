import express from "express";
import { authorize } from "../middleware/authorize.middleware";
import { requireAuth } from "../middleware/require-auth.middleware";
import { asyncHandler } from "../middleware/async-handler.middleware";
import { adminGetPresignedUrlController } from "../controllers/admin-controllers/api/v1/attachments/get-presigned-url.controller";
import { AccessPoliciesEnum } from "../infrastructure/security/access-policies.enum";

export const attachmentRouter = express.Router();

// POST: Create a Private Attachment
// attachmentRouter.post(
//   process.env.S3_PRIVATE_PATH!,
//   // requireAuth,
//   // authorize( [ AttachmentPolicies.AttachmentClaims_CREATE, CorePolicies.CoreClaims_ADMIN ] ),
//   createPrivateAttachmentController
// )

// POST: Create a Public Attachment
// attachmentRouter.post(
//   process.env.S3_PUBLIC_PATH!,
//   // requireAuth,
//   // authorize( [ AttachmentPolicies.AttachmentClaims_CREATE, CorePolicies.CoreClaims_ADMIN ] ),
//   createPublicAttachmentController
// )

// POST: Get a presigned URL to download a private file
attachmentRouter.post(
  '/download-file',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Attachment_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminGetPresignedUrlController )
);