import { UserDoc } from "models/auth/auth-user.model";
import jwt from 'jsonwebtoken';

export function authJwtTokenGen ( user: UserDoc, claims: string[] ) {
  // create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign(
    { sub: user.id, id: user.id, email: user.email, claims },
    process.env.JWT_KEY!,
    { expiresIn: `${ process.env.JWT_EXP_IN_MINS }m` }
  );
}
