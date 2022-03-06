import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { GenderEnum, User } from "models/auth/auth-user.model";

export interface IAuthEditUserParams {
  userId: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  gender?: GenderEnum;
  birthDate?: Date;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  mobilePhone?: string;
  phone?: string;
  job?: string;
  lastIp: string;
  updatedBy?: string;
  updatedByIp?: string;
  userAgent: string;
}

export async function authEditUserService ( params: IAuthEditUserParams ) {
  const user = await User.findById( params.userId );
  if ( !user ) throw new NotFoundError();
  user.set( {
    firstName: params.firstName || user.firstName,
    lastName: params.lastName || user.lastName,
    displayName: params.displayName,
    bio: params.bio,
    gender: params.gender,
    birthDate: params.birthDate,
    country: params.country,
    city: params.city,
    address: params.address,
    postalCode: params.postalCode,
    mobilePhone: params.mobilePhone,
    phone: params.phone,
    job: params.job,
    lastIp: params.lastIp,
    updatedBy: params.updatedBy,
    updatedByIp: params.updatedByIp,
    userAgent: params.userAgent
  } );

  await user.save();
  clearCache( CacheOptionServiceEnum.USER );
  return user;
}