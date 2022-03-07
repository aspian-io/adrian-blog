import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Settings, SettingsServiceEnum } from "models/settings/settings.model";

export async function settingsListService ( service: SettingsServiceEnum ) {
  const settings = await Settings.find( { service } ).cache( CacheOptionServiceEnum.SETTINGS );
  if ( !settings.length ) throw new NotFoundError();
  return settings;
}