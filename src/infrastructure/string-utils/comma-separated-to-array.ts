/**
 * 
 * Convert a comma separated string to an array with trimmed items
 * 
 * @param {string} str - Comma separated string
 * @returns {string[]} An array of trimmed items extracted from a comma separated string
 */
export const commaSeparatedToArray = ( str: string ): string[] => {
  return str.split( ',' ).map( i => i.trim() );
};