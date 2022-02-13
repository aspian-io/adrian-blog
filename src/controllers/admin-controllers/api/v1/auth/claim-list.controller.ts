import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { authClaimListService } from "../../../../../services/auth/claims/list.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminClaimListController ( req: Request, res: Response ) {
  const claims = await authClaimListService( req.t );
  res.send( claims );
  logger.info( "List of claims retrieved successfully", logSerializer( req, res, "" ) );
}