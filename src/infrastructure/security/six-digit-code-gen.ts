/**
 * 
 * Generate 6 digit random code
 * 
 * @returns {number} - 6 digit random code
 */
export function sixDigitRandomCodeGen (): number {
  return Math.floor( 100000 + Math.random() * 900000 );
}