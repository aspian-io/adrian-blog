import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authSendVerificationCodeService } from "services/auth/users/send-verification-code.service";
import { logger } from "services/winston-logger/logger.service";

export async function authPhoneVerificationController ( req: Request, res: Response ) {
  const user = await authSendVerificationCodeService( req.currentUser!.id );
  const profileDto = new AuthViewProfileDto( user );
  res.send( profileDto );
  logger.info(
    `Phone verification code has been sent to ${ req.currentUser!.email } successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_VERIFICATION_CODE_SENT, {
      user: {
        id: req.currentUser!.id
      }
    } )
  );
}