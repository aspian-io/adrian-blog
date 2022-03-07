import { matchRules } from "infrastructure/string-utils/match-rules";

export const isFileTypeAllowed = ( mimeType: string, allowedTypes: string[] ): boolean => {
  for ( let i = 0; i < allowedTypes.length; i++ ) {
    const isMatched = matchRules( mimeType, allowedTypes[ i ] );
    if ( isMatched ) return true;
  }

  return false;
};