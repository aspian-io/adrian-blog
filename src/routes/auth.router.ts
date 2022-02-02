import express from 'express';
import { currentUserController } from '../controllers/auth/current-user.controller';
import { refreshTokenController } from '../controllers/auth/refresh-token.controller';
import { signinController } from '../controllers/auth/sign-in.controller';
import { signoutController } from '../controllers/auth/sign-out.controller';
import { signupController } from '../controllers/auth/sign-up.controller';
import { signinSchema } from '../controllers/auth/validation-schemas/sign-in.schema';
import { signupSchema } from '../controllers/auth/validation-schemas/sign-up.schema';
import { asyncHandler } from '../middleware/async-handler.middleware';
import { currentUser } from '../middleware/current-user.middleware';
import { validateRequest } from '../middleware/validate-request.middleware';

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
