import express from 'express';
import { signinSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/sign-in.schema';
import { signupSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/sign-up.schema';
import { sendResetPassLinkSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/send-reset-pass-link.schema';
import { resetPasswordSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/reset-password.schema';
import { authSignupController } from 'controllers/user-controllers/api/v1/auth/sign-up.controller';
import { authSigninController } from 'controllers/user-controllers/api/v1/auth/sign-in.controller';
import { authSignoutController } from 'controllers/user-controllers/api/v1/auth/sign-out.controller';
import { authCurrentUserController } from 'controllers/user-controllers/api/v1/auth/current-user.controller';
import { authRefreshTokenController } from 'controllers/user-controllers/api/v1/auth/refresh-token.controller';
import { authSendResetPassLinkController } from 'controllers/user-controllers/api/v1/auth/send-reset-pass-link.controller';
import { authResetPasswordController } from 'controllers/user-controllers/api/v1/auth/reset-password.controller';
import { changePasswordSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/change-password.schema';
import { authChangePasswordController } from 'controllers/user-controllers/api/v1/auth/change-password.controller';
import { authChangeAvatarController } from 'controllers/user-controllers/api/v1/auth/change-avatar.controller';
import { authEditProfileController } from 'controllers/user-controllers/api/v1/auth/edit-profile.controller';
import { editProfileSchema } from 'controllers/user-controllers/api/v1/auth/validation-schemas/edit-profile.schema';
import { authViewProfileController } from 'controllers/user-controllers/api/v1/auth/view-profile.controller';
import { authPhoneVerificationController } from 'controllers/user-controllers/api/v1/auth/phone-verification.controller';
import { authPhoneVerificationConfirmController } from 'controllers/user-controllers/api/v1/auth/phone-verification-confirm.controller';
import { authEmailConfirmationLinkController } from 'controllers/user-controllers/api/v1/auth/email-confirmation-link.controller';
import { authEmailConfirmationController } from 'controllers/user-controllers/api/v1/auth/email-confirmation.controller';
import { validateRequest } from 'infrastructure/middleware/validate-request.middleware';
import { asyncHandler } from 'infrastructure/middleware/async-handler.middleware';
import { currentUser } from 'infrastructure/middleware/current-user.middleware';
import { requireAuth } from 'infrastructure/middleware/require-auth.middleware';

export const authRouter = express.Router();

// POST: Sign-up
authRouter.post( '/sign-up', signupSchema, validateRequest, asyncHandler( authSignupController ) );

// POST: Sign-in
authRouter.post( '/sign-in', signinSchema, validateRequest, asyncHandler( authSigninController ) );

// POST: Sign-out
authRouter.post( '/sign-out', asyncHandler( authSignoutController ) );

// GET: Get Current User
authRouter.get( '/current-user', currentUser, asyncHandler( authCurrentUserController ) );

// GET: Get a Refresh Token
authRouter.get( '/refresh-token', asyncHandler( authRefreshTokenController ) );

// POST: Send Reset Password Link to User's Email
authRouter.post(
  '/reset-password',
  sendResetPassLinkSchema,
  validateRequest,
  asyncHandler( authSendResetPassLinkController )
);

// POST: Reset Password
authRouter.post(
  '/reset-password/:userId/:resetToken',
  resetPasswordSchema,
  validateRequest,
  asyncHandler( authResetPasswordController )
);

// POST: Send email confirmation link to user's email
authRouter.post(
  '/confirm-email',
  requireAuth,
  asyncHandler( authEmailConfirmationLinkController )
);

// POST: Confirm email
authRouter.post(
  '/confirm-email/:userId/:verificationToken',
  requireAuth,
  asyncHandler( authEmailConfirmationController )
);

// PUT: Change Password
authRouter.put(
  '/change-password',
  requireAuth,
  changePasswordSchema,
  validateRequest,
  asyncHandler( authChangePasswordController )
);

// PUT: Change Avatar
authRouter.put(
  '/change-avatar',
  requireAuth,
  asyncHandler( authChangeAvatarController )
);

// GET: View Profile
authRouter.get(
  '/profile',
  requireAuth,
  asyncHandler( authViewProfileController )
);

// PUT: Edit Profile
authRouter.put(
  '/profile/edit',
  requireAuth,
  editProfileSchema,
  validateRequest,
  asyncHandler( authEditProfileController )
);

// POST: Send Mobile Phone Verification Code
authRouter.post(
  '/send-verification-code',
  requireAuth,
  asyncHandler( authPhoneVerificationController )
);

// POST: Mobile Phone Verification Code Confirmation
authRouter.post(
  '/verification-code-confirmation',
  requireAuth,
  asyncHandler( authPhoneVerificationConfirmController )
);