import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { authUserDetailsService } from "services/auth/users/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAuthUserDetailsController ( req: Request, res: Response ) {
  const userDetails = await authUserDetailsService( req.params.id, { ...req.query as Omit<IImgProxyPrams, "key"> } );
  res.send( userDetails );
  logger.info(
    `${ userDetails.email } details retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_ADMIN_USER_DETAILS, {
      user: {
        id: userDetails.id
      }
    } )
  );
}