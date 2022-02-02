export enum AuthLocaleEnum {
  INFO_SIGNIN = "info.auth.signin.successMsg",
  INFO_SIGNUP = "info.auth.signup.successMsg",
  INFO_SIGNOUT = "info.auth.signout.successMsg",

  ERROR_BADREQ_PASS_MISMATCH = "errors.auth.authenticateService.passMatchErr",
  ERROR_INVALID_REFRESHTOKEN = "errors.auth.getRefreshTokenService.invalidRefreshToken",
  ERROR_USER_NOT_FOUND = "errors.auth.getUserByIdService.userNotFound",
  ERROR_EMAIL_IN_USE = "errors.auth.registerService.emailInUse",

  ERROR_SCHEMA_SIGNIN_EMAIL = "errors.auth.signinSchema.email",
  ERROR_SCHEMA_SIGNIN_PASSWORD = "errors.auth.signinSchema.password",

  ERROR_SCHEMA_SIGNUP_FIRSTNAME = "errors.auth.signupSchema.firstName",
  ERROR_SCHEMA_SIGNUP_LASTNAME = "errors.auth.signupSchema.lastName",
  ERROR_SCHEMA_SIGNUP_EMAIL = "errors.auth.signupSchema.email",
  ERROR_SCHEMA_SIGNUP_PASSWORD = "errors.auth.signupSchema.password",
}