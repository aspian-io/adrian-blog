import { adminEmailSendByTemplateController } from 'controllers/admin-controllers/api/v1/email/send-by-template.controller';
import { emailSendByTemplateSchema } from 'controllers/admin-controllers/api/v1/email/validation-schemas/send-by-template.schema';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';

export const adminEmailRouter = express.Router();

adminEmailRouter.post(
  '/send-by-template',
  requireAuth,
  authorize( [ AccessPoliciesEnum.EMAIL_SEND_BY_TEMPLATE, AccessPoliciesEnum.Core_ADMIN ] ),
  emailSendByTemplateSchema,
  validateRequest,
  asyncHandler( adminEmailSendByTemplateController )
);