import express from 'express';
import { adminClaimListController } from 'controllers/admin-controllers/api/v1/auth/claim-list.controller';
import { currentUserController } from 'controllers/user-controllers/api/v1/auth/current-user.controller';
import { refreshTokenController } from 'controllers/user-controllers/api/v1/auth/refresh-token.controller';
import { signinController } from 'controllers/user-controllers/api/v1/auth/sign-in.controller';
import { signoutController } from 'controllers/user-controllers/api/v1/auth/sign-out.controller';
import { signupController } from 'controllers/user-controllers/api/v1/auth/sign-up.controller';
import { signinSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/sign-in.schema';
import { signupSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/sign-up.schema';
import { AccessPoliciesEnum } from 'infrastructure/security/access-policies.enum';
import { asyncHandler } from 'middleware/async-handler.middleware';
import { authorize } from 'middleware/authorize.middleware';
import { currentUser } from 'middleware/current-user.middleware';
import { requireAuth } from 'middleware/require-auth.middleware';
import { validateRequest } from 'middleware/validate-request.middleware';

export const authRouter = express.Router();

// POST: Sign-up
authRouter.post( '/sign-up', signupSchema, validateRequest, asyncHandler( signupController ) );

// POST: Sign-in
authRouter.post( '/sign-in', signinSchema, validateRequest, asyncHandler( signinController ) );

// POST: Sign-out
authRouter.post( '/sign-out', asyncHandler( signoutController ) );

// GET: Get Current User
authRouter.get( '/current-user', currentUser, asyncHandler( currentUserController ) );

// GET: Get a Refresh Token
authRouter.get( '/refresh-token', asyncHandler( refreshTokenController ) );

// GET: Get Claim List
authRouter.get(
  '/claims',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Auth_ClaimList, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminClaimListController )
);
