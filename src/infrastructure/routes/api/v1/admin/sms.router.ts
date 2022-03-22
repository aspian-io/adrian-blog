import { adminSmsSendByPatternController } from 'controllers/admin-controllers/api/v1/sms/send-by-pattern.controller';
import { smsSendByPatternSchema } from 'controllers/admin-controllers/api/v1/sms/validation-schemas/send-by-pattern.schema';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';

export const adminSMSRouter = express.Router();

adminSMSRouter.post(
  '/send-by-pattern',
  requireAuth,
  authorize( [ AccessPoliciesEnum.SMS_SEND_BY_PATTERN, AccessPoliciesEnum.Core_ADMIN ] ),
  smsSendByPatternSchema,
  validateRequest,
  asyncHandler( adminSmsSendByPatternController )
);