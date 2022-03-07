import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Settings, SettingsKeyEnum } from "models/settings/settings.model";

export async function settingGetValueService ( key: SettingsKeyEnum ) {
  const settingsDoc = await Settings.findOne( { key } )
    .cache( CacheOptionServiceEnum.SETTINGS );

  if ( !settingsDoc ) throw new NotFoundError();

  return settingsDoc.value;
}