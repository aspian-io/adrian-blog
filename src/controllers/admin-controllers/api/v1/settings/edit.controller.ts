import { Request, Response } from "express";
import { settingEditByIdService } from "services/settings/edit.service";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { logger } from "services/winston-logger/logger.service";
import { SettingLocaleEnum } from "infrastructure/locales/service-locale-keys/settings.locale";

export async function adminSettingEditController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  const setting = await settingEditByIdService( {
    id: req.params.id,
    value: req.body.value,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent
  } );
  res.send( setting );
  logger.info(
    "Setting modified successfully",
    logSerializer( req, res, SettingLocaleEnum.INFO_EDIT, {
      settings: setting
    } )
  );
}