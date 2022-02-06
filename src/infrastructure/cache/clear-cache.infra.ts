import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "./cache-options.infra";
import { redisWrapper } from "../database/redis/redis-client.infra";

/**
 * 
 * Clear Redis cache of the related area and service
 * 
 * @param {CacheOptionAreaEnum} area - Area of the backend service
 * @param {CacheOptionServiceEnum} serviceName - Service name
 */
export const clearCache = ( area: CacheOptionAreaEnum, serviceName: CacheOptionServiceEnum ) => {
  redisWrapper.client.del( JSON.stringify( `${ area }_${ serviceName }` ) );
};