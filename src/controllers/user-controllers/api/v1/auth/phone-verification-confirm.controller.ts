import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authConfirmVerificationCodeService } from "services/auth/users/confirm-verification-code.service";
import { logger } from "services/winston-logger/logger.service";

export async function authPhoneVerificationConfirmController ( req: Request, res: Response ) {
  const user = await authConfirmVerificationCodeService( req.currentUser!.id, req.body.verificationCode );
  const profileDto = new AuthViewProfileDto( user );
  res.send( profileDto );
  logger.info(
    `${ req.currentUser!.email } mobile phone confirmed successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_VERIFICATION_CODE_CONFIRM, {
      user: {
        id: req.currentUser!.id
      }
    } )
  );
}