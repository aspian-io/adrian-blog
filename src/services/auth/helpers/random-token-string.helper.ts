import crypto from 'crypto';

export function authRandomTokenStrGen () {
  return crypto.randomBytes( 40 ).toString( 'hex' );
}
