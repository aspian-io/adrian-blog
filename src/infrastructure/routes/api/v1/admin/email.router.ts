import { adminEmailCompletedJobsListController } from 'controllers/admin-controllers/api/v1/email/completed-jobs-list.controller';
import { adminEmailDelayedJobsListController } from 'controllers/admin-controllers/api/v1/email/delayed-jobs-list.controller';
import { adminEmailDeleteJobController } from 'controllers/admin-controllers/api/v1/email/delete-job.controller';
import { adminEmailSendByTemplateController } from 'controllers/admin-controllers/api/v1/email/send-by-template.controller';
import { adminSendEmailController } from 'controllers/admin-controllers/api/v1/email/send-email.controller';
import { emailSendByTemplateSchema } from 'controllers/admin-controllers/api/v1/email/validation-schemas/send-by-template.schema';
import { sendEmailSchema } from 'controllers/admin-controllers/api/v1/email/validation-schemas/send-email.schema';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';

export const adminEmailRouter = express.Router();

adminEmailRouter.get(
  '/delayed-jobs-list',
  requireAuth,
  authorize( [ AccessPoliciesEnum.EMAIL_DELAYED_JOBS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminEmailDelayedJobsListController )
);

adminEmailRouter.get(
  '/completed-jobs-list',
  requireAuth,
  authorize( [ AccessPoliciesEnum.EMAIL_COMPLETED_JOBS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminEmailCompletedJobsListController )
);

adminEmailRouter.delete(
  '/delete-job/:jobId',
  requireAuth,
  authorize( [ AccessPoliciesEnum.EMAIL_DELETE_JOB, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminEmailDeleteJobController )
);

adminEmailRouter.post(
  '/send-email',
  requireAuth,
  authorize( [ AccessPoliciesEnum.EMAIL_SEND_ONE, AccessPoliciesEnum.Core_ADMIN ] ),
  sendEmailSchema,
  validateRequest,
  asyncHandler( adminSendEmailController )
);

adminEmailRouter.post(
  '/send-by-template',
  requireAuth,
  authorize( [ AccessPoliciesEnum.EMAIL_SEND_BY_TEMPLATE, AccessPoliciesEnum.Core_ADMIN ] ),
  emailSendByTemplateSchema,
  validateRequest,
  asyncHandler( adminEmailSendByTemplateController )
);