import express from 'express';
import { adminActivityListController } from '../controllers/admin-controllers/api/v1/activities/list.controller';
import { asyncHandler } from '../middleware/async-handler.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { requireAuth } from '../middleware/require-auth.middleware';
import { ActivityPolicies } from '../models/enums/activity-policies.enum';
import { CorePolicies } from '../models/enums/core-policies.enum';

export const activityRouter = express.Router();

// GET: List of Taxonomies
activityRouter.get(
  '/',
  requireAuth,
  authorize( [ ActivityPolicies.ActivityClaims_LIST, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler( adminActivityListController )
);
