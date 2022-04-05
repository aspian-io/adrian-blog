import { NotFoundError } from "infrastructure/errors/not-found-error";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { User, UserDoc } from "models/auth/auth-user.model";

export async function authUserDetailsService (
  id: string,
  imgProxyParams?: Omit<IImgProxyPrams, "key">
): Promise<WithImgProxyUrlType<UserDoc>> {
  const user = await User.findById( id ).populate( 'avatar' );
  if ( !user ) throw new NotFoundError();

  const imgProxySignedUrl = imgProxyParams?.resizingType && user.avatar?.path
    ? imgProxySignUrl( { ...imgProxyParams, key: user.avatar.path } )
    : "";

  return { ...user.toJSON<UserDoc>(), imgProxySignedUrl };
}