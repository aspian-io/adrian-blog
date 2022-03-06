import express from 'express';
import { adminAuthClaimListController } from 'controllers/admin-controllers/api/v1/auth/claim-list.controller';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';
import { adminAuthUserListController } from 'controllers/admin-controllers/api/v1/auth/user-list.controller';
import { adminAuthSetSuspendUserController } from 'controllers/admin-controllers/api/v1/auth/set-suspend.controller';
import { adminAuthUserDetailsController } from 'controllers/admin-controllers/api/v1/auth/user-details.controller';
import { adminAuthUserDeleteController } from 'controllers/admin-controllers/api/v1/auth/user-delete.controller';
import { adminAuthEditUserClaimsController } from 'controllers/admin-controllers/api/v1/auth/edit-user-claims.controller';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';
import { authorize } from 'infrastructure/middleware/authorize.middleware';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';

export const adminAuthRouter = express.Router();

// GET: Get User List
adminAuthRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Auth_UserList, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAuthUserListController )
);

// GET: Get User Details
adminAuthRouter.get(
  '/details/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Auth_UserDetails, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAuthUserDetailsController )
);

// GET: Get Claim List
adminAuthRouter.get(
  '/claims',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Auth_ClaimList, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAuthClaimListController )
);

// PUT: Change User Suspension Status
adminAuthRouter.put(
  '/set-suspend-user/:userId',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Auth_Suspension, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAuthSetSuspendUserController )
);

// PUT: Change User Claims
adminAuthRouter.put(
  '/set-claims/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Auth_SetUserClaims, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAuthEditUserClaimsController )
);

// DELETE: Delete a User
adminAuthRouter.delete(
  '/delete/:id',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Auth_Delete, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminAuthUserDeleteController )
);