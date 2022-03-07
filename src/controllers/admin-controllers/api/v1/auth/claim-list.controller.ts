import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { authClaimListService } from "services/auth/claims/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAuthClaimListController ( req: Request, res: Response ) {
  const claims = await authClaimListService( req.t );
  res.send( claims );
  logger.info(
    `List of claims retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_ADMIN_ClAIMS, { user: { id: req.currentUser!.id } } )
  );
}