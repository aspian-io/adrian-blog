/**
 * Cache Options type
 */
export interface CacheOptions { area: CacheOptionAreaEnum, serviceName: CacheOptionServiceEnum };

/**
 * Cache option area enum
 */
export enum CacheOptionAreaEnum {
  ADMIN = "ADMIN",
  USER = "USER"
}

/**
 * Cache option service enum
 */
 export enum CacheOptionServiceEnum {
  TAXONOMY = "TAXONOMY",
  POST = "POST",
  ATTACHMENT = "ATTACHMENT"
}