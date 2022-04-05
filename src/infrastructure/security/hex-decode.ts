export function hexDecode ( hex: string ) {
  return Buffer.from( hex, 'hex' );
}