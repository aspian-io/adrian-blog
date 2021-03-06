import { adminSmsCompletedJobsListController } from 'controllers/admin-controllers/api/v1/sms/completed-jobs-list.controller';
import { adminSmsCreditController } from 'controllers/admin-controllers/api/v1/sms/credit.controller';
import { adminSmsDelayedJobsListController } from 'controllers/admin-controllers/api/v1/sms/delayed-jobs-list.controller';
import { adminSmsDeleteJobController } from 'controllers/admin-controllers/api/v1/sms/delete-job.controller';
import { adminSmsSendByPatternController } from 'controllers/admin-controllers/api/v1/sms/send-by-pattern.controller';
import { adminSendSmsController } from 'controllers/admin-controllers/api/v1/sms/send-sms.controller';
import { smsSendByPatternSchema } from 'controllers/admin-controllers/api/v1/sms/validation-schemas/send-by-pattern.schema';
import { sendSmsSchema } from 'controllers/admin-controllers/api/v1/sms/validation-schemas/send-sms.schema';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';

export const adminSMSRouter = express.Router();

adminSMSRouter.get(
  '/delayed-jobs-list',
  requireAuth,
  authorize( [ AccessPoliciesEnum.SMS_DELAYED_JOBS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminSmsDelayedJobsListController )
);

adminSMSRouter.get(
  '/completed-jobs-list',
  requireAuth,
  authorize( [ AccessPoliciesEnum.SMS_COMPLETED_JOBS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminSmsCompletedJobsListController )
);

adminSMSRouter.delete(
  '/delete-job/:jobId',
  requireAuth,
  authorize( [ AccessPoliciesEnum.SMS_DELETE_JOB, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminSmsDeleteJobController )
);

adminSMSRouter.get(
  '/credit',
  requireAuth,
  authorize( [ AccessPoliciesEnum.SMS_CREDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminSmsCreditController )
);

adminSMSRouter.post(
  '/send-sms',
  requireAuth,
  authorize( [ AccessPoliciesEnum.SMS_SEND, AccessPoliciesEnum.Core_ADMIN ] ),
  sendSmsSchema,
  validateRequest,
  asyncHandler( adminSendSmsController )
);

adminSMSRouter.post(
  '/send-by-pattern',
  requireAuth,
  authorize( [ AccessPoliciesEnum.SMS_SEND_BY_PATTERN, AccessPoliciesEnum.Core_ADMIN ] ),
  smsSendByPatternSchema,
  validateRequest,
  asyncHandler( adminSmsSendByPatternController )
);