import express from 'express';
import { adminActivityListController } from 'controllers/admin-controllers/api/v1/activities/list.controller';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';
import { asyncHandler } from 'middleware/async-handler.middleware';
import { authorize } from 'middleware/authorize.middleware';
import { requireAuth } from 'middleware/require-auth.middleware';

export const activityRouter = express.Router();

// GET: List of Taxonomies
activityRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Activity_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminActivityListController )
);
