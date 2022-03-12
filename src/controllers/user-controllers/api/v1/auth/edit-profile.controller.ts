import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { UserDoc } from "models/auth/auth-user.model";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authEditUserService } from "services/auth/users/edit.service";
import { logger } from "services/winston-logger/logger.service";

export async function authEditProfileController ( req: Request, res: Response ) {
  const user = await authEditUserService( {
    ...req.body,
    userId: req.currentUser!.id,
    lastIp: req.ip,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent: req.get( 'User-Agent' ) ?? 'unknown_agent'
  } );

  const profileDto = dtoMapper( user, AuthViewProfileDto );

  res.send( profileDto );
  logger.info(
    `${ user.email } profile modified successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_PROFILE_CHANGED, { user: { id: user.id } } )
  );
}