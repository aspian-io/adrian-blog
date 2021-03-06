import { DTOMapper } from "infrastructure/service-utils/dto-mapper";
import { GenderEnum } from "models/auth/auth-user.model";

export class SMSUserInfoDto extends DTOMapper {
  firstName: string = '';
  lastName: string = '';
  displayName?: string = undefined;
  bio?: string = undefined;
  gender?: GenderEnum = undefined;
  birthDate?: Date = undefined;
  country?: string = undefined;
  city?: string = undefined;
  address?: string = undefined;
  postalCode?: string = undefined;
  mobilePhone: string = '';
  phone?: string = undefined;
  job?: string = undefined;
  email: string = '';
}