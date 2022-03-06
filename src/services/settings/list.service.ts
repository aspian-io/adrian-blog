import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { Settings, SettingsServiceEnum } from "models/settings/settings.model";

export async function settingsListService ( service: SettingsServiceEnum ) {
  const settings = await Settings.find( { service } ).cache( CacheOptionServiceEnum.SETTINGS );
  return settings;
}