import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { CacheOptionServiceEnum } from "./cache-options";

/**
 * 
 * Clear Redis cache of the related area and service
 * 
 * @param {CacheOptionAreaEnum} area - Area of the backend service
 * @param {CacheOptionServiceEnum} serviceName - Service name
 */
export const clearCache = ( serviceName: CacheOptionServiceEnum ) => {
  redisWrapper.client.del( JSON.stringify( serviceName ) );
};