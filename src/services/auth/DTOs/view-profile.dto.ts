import { GenderEnum } from "models/auth/auth-user.model";

export class AuthViewProfileDto {
  firstName?: string = undefined;
  lastName?: string = undefined;
  avatar?: string = undefined;
  job?: string = undefined;
  email?: string = undefined;
  displayName?: string = undefined;
  bio?: string = undefined;
  gender?: GenderEnum = undefined;
  birthDate?: Date = undefined;
  country?: string = undefined;
  city?: string = undefined;
  address?: string = undefined;
  postalCode?: string = undefined;
  mobilePhone?: string = undefined;
  isMobilePhoneVerified?: boolean = undefined;
  isEmailConfirmed?: boolean = undefined;
  phone?: string = undefined;
  imgProxySignedUrl?: string = undefined;
}