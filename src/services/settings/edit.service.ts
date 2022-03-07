import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { Settings } from 'models/settings/settings.model';

export interface ISettingsEdit {
  id: string;
  value: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function settingEditByIdService ( data: ISettingsEdit ) {
  const { id, value, updatedBy, updatedByIp, userAgent } = data;
  const setting = await Settings.findById( id );

  if ( !setting ) throw new NotFoundError();

  setting.set( {
    ...setting,
    value,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await setting.save();
  clearCache( CacheOptionServiceEnum.SETTINGS );
  return setting;
}