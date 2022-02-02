import { User } from "../../models/auth-user.model"
import { basicDetailsService } from "./basic-details.service"

export async function getAllUsersService () {
  const users = await User.find()
  return users.map( x => basicDetailsService( x ) )
}