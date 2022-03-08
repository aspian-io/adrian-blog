import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { commaSeparatedToArray } from "infrastructure/string-utils/comma-separated-to-array";
import { FilterQuery, Model } from "mongoose";
import { ParsedQs } from 'qs';

// Input params
export interface IListQueryParams<T> {
  model: Model<T>;                                                  // Mongoose Model (T is type of the Model's Document)
  fieldsToExclude: string[];                                        // Model fields we do not want to use for filtering
  cache?: IListQueryCache;                                          // Enable or disable Redis cache for the result
  page: number;                                                     // Number of the page
  size: number;                                                     // Number of documents per page
  orderBy?: string;                                                 // End result will be ordered by the field specified here
  orderParam?: number;                                              // Use to specify descending or ascending order (1 | -1)
  filterBy: string | ParsedQs | string[] | ParsedQs[] | undefined;  // End result will be filtered by using these fields
  queryStringParams: ParsedQs;                                      // Query string params to use for filtering (req.query)
  dateFields?: string[];                                            // Specifying Model field names of type Date
}

// Result type
export interface IListQueryResult<T> {
  data: T[];                                // List of documents after processing
  metadata: IListQueryMetadata;             // Metadata
}

// Result metadata
export interface IListQueryMetadata {
  total: number;                      // Total number of documents after filtering
  page: number;                       // Number of the page
  totalPages: number;                 // Total number of pages
  numberPerPage: number;              // Number of documents per page
}

// Cache params type
interface IListQueryCache {
  useCache: boolean;
  cacheOptionService: CacheOptionServiceEnum;
}

// Filter Object Type
interface IFilterQuery {
  [ key: string ]: RegExp | { $gte: Date; $lt: Date; };
}

// Sort Object Type
interface ISortQuery {
  [ key: string ]: 1 | -1;
}

/**
 * 
 * Generate conditional list (filtered, sorted, TimeSpanned and paginated) from a specific mongoose model
 * 
 * @param {IListQueryParams<T>} params - Params to generate conditional list of type `IListQueryParams<T>`
 * @returns {Promise<IListQueryResult<T>>} A Promise of type `IListQueryResult<T>`
 */
export async function docListGenerator<T> ( params: IListQueryParams<T> ): Promise<IListQueryResult<T>> {
  const {
    model,
    fieldsToExclude,
    page,
    size,
    filterBy,
    queryStringParams,
    dateFields,
    orderBy,
    orderParam,
    cache } = params;

  let modelKeys = [ ...Object.keys( model.schema.paths ) ];

  if ( fieldsToExclude.length ) {
    if ( fieldsToExclude.includes( "createdAt" ) ) {
      throw new BadRequestError(
        "Excluding `createdAt` while generating list query params is not allowed",
        CoreLocaleEnum.ERROR_400_MSG
      );
    }
    modelKeys = modelKeys.filter( field => !fieldsToExclude.includes( field ) );
  }

  const dateFieldsVal = dateFields && dateFields.length ? dateFields : [ 'createdAt', 'updatedAt' ];
  const isFilterByArray = Array.isArray( filterBy );

  let filterByVal = [];
  if ( isFilterByArray ) {
    filterByVal = Array.from( new Set( modelKeys.filter( key => filterBy.includes( key as any ) ) ) );
  } else {
    filterByVal = filterBy ? [ filterBy.toString() ] : [];
  }

  const nonDateFilterBy = filterByVal.filter( f => !dateFieldsVal.includes( f ) );
  const dateFilterBy = dateFieldsVal;

  const orderByVal = orderBy && modelKeys.includes( orderBy.toString() ) ? orderBy : "createdAt";
  const orderParamVal = ( orderParam !== 1 && orderParam !== -1 ) ? -1 : orderParam;

  const filter: IFilterQuery = {};

  let resultList: T[] = [];
  let total = 0;

  if ( nonDateFilterBy.length ) {
    nonDateFilterBy.forEach( nonDateFilter => {
      if ( queryStringParams[ nonDateFilter ] ) {
        filter[ nonDateFilter ] = new RegExp( queryStringParams[ nonDateFilter ]!.toString() );
      }
    } );
  }

  if ( dateFilterBy.length ) {
    dateFilterBy.forEach( dateFilter => {
      if ( queryStringParams[ dateFilter ] ) {
        let qStrParam = commaSeparatedToArray( queryStringParams[ dateFilter ]!.toString() );
        const isStartDateValid = Array.isArray( qStrParam ) && qStrParam.length === 2
          ? !isNaN( new Date( qStrParam[ 0 ].toString() ).getTime() )
          : false;
        const isEndDateValid = Array.isArray( qStrParam ) && qStrParam.length === 2
          ? !isNaN( new Date( qStrParam[ 1 ].toString() ).getTime() )
          : false;
        if ( isStartDateValid && isEndDateValid && Array.isArray( qStrParam ) ) {
          filter[ dateFilter ] = { $gte: new Date( qStrParam[ 0 ].toString() ), $lt: new Date( qStrParam[ 1 ].toString() ) };
        }
      }
    } );
  }

  total = await model.find( filter as FilterQuery<T> ).count();

  let limit = 10;
  if ( size < 1 ) {
    limit = 1;
  } else if ( size > total ) {
    limit = total;
  } else {
    limit = size;
  }

  const totalPages = Math.ceil( total / limit );
  let pageVal = 1;
  if ( page < 1 ) {
    pageVal = 1;
  } else if ( page > totalPages ) {
    pageVal = totalPages;
  } else {
    pageVal = page;
  }
  const skip = ( pageVal - 1 ) * limit;

  const sort: ISortQuery = {};
  sort[ orderByVal ] = orderParamVal;

  if ( cache && cache?.useCache ) {
    resultList = await model.find( filter as FilterQuery<T>, null, { skip, limit, sort } ).cache( cache.cacheOptionService );
  } else {
    resultList = await model.find( filter as FilterQuery<T>, null, { skip, limit, sort } );
  }

  return {
    data: resultList,
    metadata: {
      page,
      totalPages,
      total,
      numberPerPage: limit
    }
  };
}