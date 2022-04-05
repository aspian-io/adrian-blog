import { Request, Response } from "express";
import { IImgProxyPrams } from "infrastructure/imgproxy/sign-url";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { authUserListService } from "services/auth/users/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAuthUserListController ( req: Request, res: Response ) {
  const resultUsers = await authUserListService( {
    query: req.query,
    preDefinedOrders: [ {
      orderBy: "createdAt",
      orderParam: -1
    } ],
    fieldsToPopulate: { path: "avatar" },
    imgProxyParams: { ...req.query as Omit<IImgProxyPrams, "key"> }
  } );

  res.send( resultUsers );
  logger.info(
    `User list retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_GET_USER_LIST ) );
}