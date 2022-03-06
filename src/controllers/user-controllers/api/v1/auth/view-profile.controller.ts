import { Request, Response } from "express";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authUserDetailsService } from "services/auth/users/details.service";
import { logger } from "services/winston-logger/logger.service";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";

export async function authViewProfileController ( req: Request, res: Response ) {
  const userDetails = await authUserDetailsService( req.currentUser!.id );
  const profileDto = new AuthViewProfileDto( userDetails );

  res.send( profileDto );
  logger.info(
    `${ userDetails.email } views their profile`,
    logSerializer( req, res, AuthLocaleEnum.INFO_VIEW_PROFILE, { user: { id: userDetails.id } } )
  );
}