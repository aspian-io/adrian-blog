import { UserDoc } from "../../models/auth/auth-user.model";

export function basicDetailsService ( user: UserDoc ) {
  const { firstName, lastName, email } = user;
  return { firstName, lastName, email };
}