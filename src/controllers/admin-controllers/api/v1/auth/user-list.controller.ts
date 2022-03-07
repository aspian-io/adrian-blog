import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { authUserListService } from "services/auth/users/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAuthUserListController ( req: Request, res: Response ) {
  const page = req.query.page ? parseInt( req.query.page.toString() ) : 1;
  const size = req.query.size ? parseInt( req.query.size.toString() ) : 10;
  const orderField = req.query.orderField ? req.query.orderField.toString() : undefined;
  const orderParam = req.query.orderParam ? parseInt( req.query.orderParam.toString() ) : undefined;
  const filterField = req.query.filterField ? req.query.filterField.toString() : undefined;
  const filterParam = req.query.filterParam ? req.query.filterParam.toString() : undefined;
  const resultUsers = await authUserListService( {
    page,
    size,
    orderField,
    orderParam,
    filterField,
    filterParam
  } );

  res.send( resultUsers );
  logger.info(
    `User list retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_GET_USER_LIST ) );
}