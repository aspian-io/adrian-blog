import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { authDeleteUserService } from "services/auth/users/delete.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAuthUserDeleteController ( req: Request, res: Response ) {
  const deletedUser = await authDeleteUserService( req.params.id );
  res.send( deletedUser );
  logger.info(
    `User <${ deletedUser.email }> deleted by admin <${ req.currentUser!.email }>`,
    logSerializer( req, res, AuthLocaleEnum.INFO_ADMIN_USER_DELETE, {
      user: deletedUser
    } )
  );
}