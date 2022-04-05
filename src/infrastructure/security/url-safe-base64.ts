export function urlSafeBase64 ( string: string ) {
  return Buffer.from( string ).toString( 'base64' ).replace( /=/g, '' ).replace( /\+/g, '-' ).replace( /\//g, '_' );
}