import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { User, UserDoc } from "models/auth/auth-user.model";

export interface IAuthChangeAvatarParams {
  userId: string;
  avatarId?: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
  imgProxyParams?: Omit<IImgProxyPrams, "key">;
}

export async function authChangeAvatarService ( params: IAuthChangeAvatarParams ): Promise<WithImgProxyUrlType<UserDoc>> {
  const { userId, avatarId, updatedBy, updatedByIp, userAgent, imgProxyParams } = params;
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();
  user.set( {
    avatar: avatarId,
    updatedBy,
    updatedByIp,
    userAgent
  } );
  await user.save();
  await user.populate( "avatar" );

  const imgProxySignedUrl = imgProxyParams?.resizingType && user.avatar?.path
    ? imgProxySignUrl( { ...imgProxyParams, key: user.avatar.path } )
    : "";

  clearCache( CacheOptionServiceEnum.USER );
  return { ...user.toJSON<UserDoc>(), imgProxySignedUrl };
}