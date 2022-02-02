import { RefreshToken } from "../../models/auth-refresh-token.model"

async function getRefreshTokens ( userId: string ) {
  // return refresh tokens for user
  const refreshTokens = await RefreshToken.find( { user: userId } )
  return refreshTokens
}

export default getRefreshTokens