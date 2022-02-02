import crypto from 'crypto'

export function randomTokenStringService () {
  return crypto.randomBytes( 40 ).toString( 'hex' )
}
