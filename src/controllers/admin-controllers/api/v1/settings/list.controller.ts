import { Request, Response } from "express";
import { SettingsServiceEnum } from "models/settings/settings.model";
import { settingsListService } from "services/settings/list.service";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { logger } from "services/winston-logger/logger.service";
import { SettingLocaleEnum } from "infrastructure/locales/service-locale-keys/settings.locale";

export async function adminSettingsListController ( req: Request, res: Response ) {
  const service = SettingsServiceEnum[ req.params.service as keyof typeof SettingsServiceEnum ];
  const settings = await settingsListService( service );
  res.send( settings );
  logger.info(
    "Settings list retrieved successfully",
    logSerializer( req, res, SettingLocaleEnum.INFO_LIST )
  );
}