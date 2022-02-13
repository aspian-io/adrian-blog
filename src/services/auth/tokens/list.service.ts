import { RefreshToken } from "models/auth/auth-refresh-token.model";

async function authRefreshTokenListService ( userId: string ) {
  // return refresh tokens for user
  const refreshTokens = await RefreshToken.find( { user: userId } );
  return refreshTokens;
}

export default authRefreshTokenListService;