import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { User } from "models/auth/auth-user.model";
import { AuthViewProfileDto } from "../DTOs/view-profile.dto";

export async function userBirthdayService () {
  const birthdayUsers = await User.find( {
    $expr: {
      $and: [
        { $eq: [ { $dayOfMonth: { $toDate: '$birthDate' } }, { $dayOfMonth: new Date() } ] },
        { $eq: [ { $month: { $toDate: '$birthDate' } }, { $month: new Date() } ] },
      ]
    }
  } );

  const usersDto = dtoMapper( birthdayUsers, AuthViewProfileDto );
  return usersDto;
}