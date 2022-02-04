import { createClient } from 'redis';
import chalk from 'chalk';
import emoji from 'node-emoji';
const { log } = console;
const boldGreen = chalk.bold.green;

class RedisWrapper {
  private _client?: ReturnType<typeof createClient>;

  get client () {
    if ( !this._client ) {
      throw new Error( "Cannot access Redis client" );
    }

    return this._client;
  }

  async connect ( redisUrl: string ) {
    this._client = createClient( { url: redisUrl } );
    try {
      await this._client.connect();
      log( boldGreen( `${ emoji.get( 'white_check_mark' ) } Connected to Redis cache server ${ emoji.get( 'cocktail' ) }` ) );
    } catch ( error ) {
      throw new Error( "Error connecting to Redis cache server" );
    }
  }
}

export const redisWrapper = new RedisWrapper();