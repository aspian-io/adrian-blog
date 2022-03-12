import { Request, Response } from "express";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authUserDetailsService } from "services/auth/users/details.service";
import { logger } from "services/winston-logger/logger.service";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { UserDoc } from "models/auth/auth-user.model";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";

export async function authViewProfileController ( req: Request, res: Response ) {
  const userDetails = await authUserDetailsService( req.currentUser!.id );
  const profileDto = dtoMapper( userDetails, AuthViewProfileDto );

  res.send( profileDto );
  logger.info(
    `${ userDetails.email } views their profile`,
    logSerializer( req, res, AuthLocaleEnum.INFO_VIEW_PROFILE, { user: { id: userDetails.id } } )
  );
}