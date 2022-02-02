import { envKeys } from "./env-keys"
import chalk from 'chalk'

// process.env check for the keys to see if they exist
export const envTypeGuards = () => {
  envKeys.forEach( key => {
    if ( !process.env[ key ] ) throw new Error( chalk.bold.red( `${ key } must be defined!` ) )
  } )
}