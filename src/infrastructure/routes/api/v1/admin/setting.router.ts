import { adminSettingEditController } from 'controllers/admin-controllers/api/v1/settings/edit.controller';
import { adminSettingsListController } from 'controllers/admin-controllers/api/v1/settings/list.controller';
import { settingEditSchema } from 'controllers/admin-controllers/api/v1/settings/validation-schemas/setting-edit.schema';
import express from 'express';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';

export const adminSettingRouter = express.Router();

// GET: Get settings list of a service
adminSettingRouter.get(
  '/:service',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Setting_List, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminSettingsListController )
);

// PUT: Edit a setting value
adminSettingRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Setting_Edit, AccessPoliciesEnum.Core_ADMIN ] ),
  settingEditSchema,
  validateRequest,
  asyncHandler( adminSettingEditController )
);