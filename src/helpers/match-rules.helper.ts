// Using wildcards to check if the provided string fulfills the rules 
export const matchRules = ( str: string, rule: string ) => {
  var escapeRegex = ( str: string ) => str.replace( /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" );
  return new RegExp( "^" + rule.split( "*" ).map( escapeRegex ).join( ".*" ) + "$" ).test( str );
};