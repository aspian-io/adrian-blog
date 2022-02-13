import { redisWrapper } from 'infrastructure/database/redis/redis-client.infra';
import mongoose from 'mongoose';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from './cache-options.infra';

/**
 * Custom type for mongoose Document to use Redis cache
 */
declare module 'mongoose' {
  interface DocumentQuery<T> {
    mongooseCollection: {
      name: any;
    };
    cache ( area: CacheOptionAreaEnum, serviceName: CacheOptionServiceEnum ): Promise<T>;
    useCache: boolean;
    hashKey: string;
  }

  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
    extends DocumentQuery<ResultType> { }
}

/**
 * Make mongoose Query capable of using Redis cache
 */
export const startCacheMongooseQueries = async () => {

  mongoose.Query.prototype.cache = async function ( area: CacheOptionAreaEnum, serviceName: CacheOptionServiceEnum ) {
    this.useCache = process.env.USING_CACHE === "true";
    this.hashKey = JSON.stringify( `${ area }_${ serviceName }` );
    return this;
  };

  const exec = mongoose.Query.prototype.exec;
  // Caching every mongoose query
  mongoose.Query.prototype.exec = async function () {
    if ( !this.useCache ) {
      // @ts-ignore
      return exec.apply( this, arguments );
    }
    const key = JSON.stringify( Object.assign( {}, this.getQuery(), {
      collection: this.mongooseCollection.name
    } ) );
    // See if we have a value for key in redis
    const cacheValue = await redisWrapper.client.hGet( this.hashKey, key );
    // If we do, return that
    if ( cacheValue ) {
      console.log( "READING FROM CACHE" );
      const doc = JSON.parse( cacheValue );
      return Array.isArray( doc )
        ? doc.map( d => new this.model( d ) )
        : new this.model( doc );
    }
    // Otherwise, issue the query and store the result in redis
    // @ts-ignore
    const result = await exec.apply( this, arguments );
    // Cache the query result into Redis
    const value: string = JSON.stringify( result );
    if ( !!result ) {
      await redisWrapper.client.hSet( this.hashKey, key, value );
    }

    return result;
  };
};