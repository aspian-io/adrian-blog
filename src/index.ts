import { app } from 'app';
import emoji from 'node-emoji';
import companion from '@uppy/companion';
import { envTypeGuards } from 'infrastructure/env/env-type-guards';
import chalk from 'chalk';
import { redisWrapper } from 'infrastructure/database/redis/redis-client.infra';
import { startCacheMongooseQueries } from 'infrastructure/cache/redis-cache-extension.infra';
import { connectToMongoDB } from 'infrastructure/database/mongodb/mongoose-connection.infra';
const boldGreen = chalk.bold.green;

const start = async () => {
  // Check to see all ENVs exist
  envTypeGuards();
  // Connect to database
  await connectToMongoDB();
  // Connect to Redis
  await redisWrapper.connect( process.env.REDIS_URL! );
  // Start Mongoose cache queries
  await startCacheMongooseQueries();

  const PORT = process.env.PORT;
  const server = app.listen(
    PORT,
    () => console.log( boldGreen(
      `${ emoji.get( 'white_check_mark' ) } Express server started on port ${ PORT } ${ emoji.get( 'beer' ) }`
    ) )
  );
  // Uppy companion socket
  companion.socket( server );
};

start();
