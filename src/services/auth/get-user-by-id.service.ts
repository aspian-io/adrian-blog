import mongoose from "mongoose";
import { BadRequestError } from "../../errors/bad-request-error";
import { AuthLocaleEnum } from "../../locales/service-locale-keys/auth.locale";
import { User } from "../../models/auth-user.model";

export async function getUserByIdService ( id: string ) {
  if ( !mongoose.isValidObjectId( id ) ) throw new BadRequestError( "User not found" );
  const user = await User.findById( id );
  if ( !user ) throw new BadRequestError( "User not found", AuthLocaleEnum.ERROR_USER_NOT_FOUND );
  return user;
}
