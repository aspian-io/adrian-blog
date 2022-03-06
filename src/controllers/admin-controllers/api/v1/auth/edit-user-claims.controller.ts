import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { authEditUserClaimsService } from "services/auth/users/edit-user-claims.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAuthEditUserClaimsController ( req: Request, res: Response ) {
  const user = await authEditUserClaimsService( req.params.id, req.body.claims );
  res.send( user );
  logger.info(
    `${ user.email } claims edited by admin`,
    logSerializer( req, res, AuthLocaleEnum.INFO_ADMIN_USER_CLAIMS_MODIFIED, {
      user: {
        id: user.id
      }
    } )
  );
}