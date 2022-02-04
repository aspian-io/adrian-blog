import mongoose from 'mongoose';
import { app } from './app';
import { authSeeder } from './models/seeders/auth.seeder';
import emoji from 'node-emoji';
import companion from '@uppy/companion';
import { envTypeGuards } from './infrastructure/env/env-type-guards';
import chalk from 'chalk';
import { redisWrapper } from './infrastructure/mongoose-extensions/cache/redis-client.infra';
import { startCacheMongooseQueries } from './infrastructure/mongoose-extensions/cache/redis-cache-server.infra';
const { log } = console;
const boldGreen = chalk.bold.green;

const start = async () => {
  // Check to see all ENVs exist
  envTypeGuards();

  try {
    await mongoose.connect( process.env.DB_HOST! );
    log( boldGreen( `${ emoji.get( 'white_check_mark' ) } Connected to MongoDB ${ emoji.get( 'cocktail' ) }` ) );
    if ( process.env.SEEDER === "true" ) {
      await authSeeder();
    }
  } catch ( error ) {
    log( error );
  }

  try {
    await redisWrapper.connect( process.env.REDIS_URL! );
    await startCacheMongooseQueries();
  } catch ( error ) {
    log( error );
  }

  const PORT = process.env.PORT;
  const server = app.listen( PORT, () => log( boldGreen( `${ emoji.get( 'white_check_mark' ) } Express server started on port ${ PORT } ${ emoji.get( 'beer' ) }` ) ) );
  companion.socket( server );
};

start();
