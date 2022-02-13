import { redisWrapper } from "infrastructure/database/redis/redis-client.infra";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "./cache-options.infra";

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