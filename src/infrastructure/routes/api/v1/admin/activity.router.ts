import express from 'express';
import { adminActivityListController } from 'controllers/admin-controllers/api/v1/activities/list.controller';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const adminActivityRouter = express.Router();

// GET: List of Activities
adminActivityRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Activity_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminActivityListController )
);
