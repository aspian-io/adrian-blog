import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authChangeAvatarService } from "services/auth/users/change-avatar.service";
import { logger } from "services/winston-logger/logger.service";

export async function authChangeAvatarController ( req: Request, res: Response ) {
  const updatedByIp = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? 'unknown_agent';
  const user = await authChangeAvatarService( {
    userId: req.currentUser!.id,
    avatarUrl: req.body.avatarUrl,
    updatedBy: req.currentUser!.id,
    updatedByIp,
    userAgent
  } );
  const profileDto = new AuthViewProfileDto( user );

  res.send( profileDto );
  logger.info(
    `${ user.email } avatar changed successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_AVATAR_CHANGED, { user: { id: user.id } } )
  );
}