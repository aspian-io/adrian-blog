import { User } from "models/auth/auth-user.model";

export async function userBirthdayService () {
  const birthdayUsers = await User.find( {
    $expr: {
      $and: [
        { $eq: [ { $dayOfMonth: { $toDate: '$birthDate' } }, { $dayOfMonth: new Date() } ] },
        { $eq: [ { $month: { $toDate: '$birthDate' } }, { $month: new Date() } ] },
      ]
    }
  } );

  return birthdayUsers;
}