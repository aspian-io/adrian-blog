import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { commaSeparatedToArray } from "infrastructure/string-utils/comma-separated-to-array";
import { FilterQuery, Model } from "mongoose";
import { ParsedQs } from 'qs';
import { dtoMapper } from "./dto-mapper";

// Input params
export interface IListQueryParams<T, U = T> {
  model: Model<T>;                                                  // Mongoose Model (T is type of the Model's Document)
  fieldsToExclude: string[];                                        // Model fields we do not want to use for filtering
  cache?: IListQueryCache;                                          // Enable or disable Redis cache for the result
  queryStringParams: ParsedQs;                                      // Query string params to use for filtering (req.query)
  preDefinedFilters?: IListQueryPreDefinedFilters[];                // Pre-defined filters to apply
  dataMapTo?: new () => U;                                          // An instance of DTO class to map data to
}

// Result type
export interface IListQueryResult<T, U = T> {
  data: T[] | U[];                                                  // List of documents after processing
  metadata: IListQueryMetadata;                                     // Metadata
}

// Result metadata
export interface IListQueryMetadata {
  total: number;                                                    // Total number of documents after filtering
  page: number;                                                     // Number of the page
  totalPages: number;                                               // Total number of pages
  numberPerPage: number;                                            // Number of documents per page
  currentPageResultsNumber: number;                                 // Number of current page returned results
  skipped: number;                                                  // Number of skipped results
}

// Cache params type
interface IListQueryCache {
  useCache: boolean;
  cacheOptionService: CacheOptionServiceEnum;
}

// Pre-defined filters type
export interface IListQueryPreDefinedFilters {
  filterBy: string;
  filterParam: string;
}

/**
 * 
 * Generate conditional list (filtered, sorted, TimeSpanned and paginated) from a specific mongoose model
 * 
 * @param {IListQueryParams<T>} params - Params to generate conditional list of type `IListQueryParams<T>`
 * @returns {Promise<IListQueryResult<T>>} A Promise of type `IListQueryResult<T>`
 */
export async function docListGenerator<T, U = T> ( params: IListQueryParams<T, U> ): Promise<IListQueryResult<T, U>> {
  const { model, fieldsToExclude, queryStringParams, cache, preDefinedFilters, dataMapTo } = params;

  let modelKeys = Object.keys( model.schema.paths );
  const page = queryStringParams.page ? parseInt( queryStringParams.page.toString() ) : 1;
  const size = queryStringParams.size ? parseInt( queryStringParams.size.toString() ) : 10;
  const filterBy = queryStringParams.filterBy;
  const orderBy = queryStringParams.orderBy?.toString() || "createdAt";
  const orderParam = queryStringParams.orderParam ? parseInt( queryStringParams.orderParam.toString() ) : -1;
  const dateFields = modelKeys.filter( key => model.schema.path( key ).instance === "Date" );

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

  let filterByVal: string[] = [];
  if ( isFilterByArray ) {
    filterByVal = Array.from( new Set( modelKeys.filter( key => filterBy.includes( key as any ) ) ) );
  } else {
    const filterByAsArray = filterBy ? [ filterBy.toString() ] : [];
    filterByVal = filterByAsArray.length
      ? Array.from( new Set( modelKeys.filter( key => filterByAsArray.includes( key as any ) ) ) )
      : [];
  }

  const nonDateFilterBy = filterByVal.filter( f => !dateFieldsVal.includes( f ) );
  const dateFilterBy = filterByVal.filter( f => dateFieldsVal.includes( f ) );

  const nonDatePreDefinedFilterBY = preDefinedFilters?.filter( pdf => !dateFieldsVal.includes( pdf.filterBy ) );
  const datePreDefinedFilterBY = preDefinedFilters?.filter( pdf => dateFieldsVal.includes( pdf.filterBy ) );

  const orderByVal = orderBy && modelKeys.includes( orderBy.toString() ) ? orderBy : "createdAt";
  const orderParamVal = ( orderParam !== 1 && orderParam !== -1 ) ? -1 : orderParam;

  const filter: Record<string, RegExp | { $gte: Date; $lte: Date; } | number | string> = {};

  let resultsList: T[] = [];
  let dtoResultsList: U[] = [];
  let total = 0;
  let currentPageResultsNumber = 0;

  if ( nonDateFilterBy.length ) {
    nonDateFilterBy.forEach( nonDateFilter => {
      if ( queryStringParams[ nonDateFilter ] ) {
        const filterValue = isNaN( parseInt( queryStringParams[ nonDateFilter ]!.toString() ) )
          ? new RegExp( queryStringParams[ nonDateFilter ]!.toString() )
          : queryStringParams[ nonDateFilter ]!.toString();
        filter[ nonDateFilter ] = filterValue;
      }
    } );
  }

  if ( nonDatePreDefinedFilterBY && nonDatePreDefinedFilterBY.length ) {
    nonDatePreDefinedFilterBY.forEach( pdf => {
      const filterValue = isNaN( parseInt( pdf.filterParam ) )
        ? new RegExp( pdf.filterParam )
        : pdf.filterParam;
      filter[ pdf.filterBy ] = filterValue;
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
          filter[ dateFilter ] = { $gte: new Date( qStrParam[ 0 ].toString() ), $lte: new Date( qStrParam[ 1 ].toString() ) };
        }
      }
    } );
  }

  if ( datePreDefinedFilterBY && datePreDefinedFilterBY.length ) {
    datePreDefinedFilterBY.forEach( pdf => {
      let datesToArr = commaSeparatedToArray( pdf.filterParam );
      const isStartDateValid = Array.isArray( datesToArr ) && datesToArr.length === 2
        ? !isNaN( new Date( datesToArr[ 0 ].toString() ).getTime() )
        : false;
      const isEndDateValid = Array.isArray( datesToArr ) && datesToArr.length === 2
        ? !isNaN( new Date( datesToArr[ 1 ].toString() ).getTime() )
        : false;
      if ( isStartDateValid && isEndDateValid ) {
        filter[ pdf.filterBy ] = { $gte: new Date( datesToArr[ 0 ].toString() ), $lte: new Date( datesToArr[ 1 ].toString() ) };
      }
    } );
  }

  total = await model.find( filter as FilterQuery<T> ).count();

  let limit = 10;
  if ( size < 1 ) {
    limit = 1;
  } else if ( size > 100 ) {
    limit = 100;
  } else {
    limit = size;
  }

  const totalPages = Math.ceil( total / limit );
  let pageVal = 1;
  if ( page < 1 ) {
    pageVal = 1;
  } else if ( page > totalPages ) {
    pageVal = totalPages > 0 ? totalPages : 1;
  } else {
    pageVal = 1;
  }
  const skip = ( pageVal - 1 ) * limit;

  const sort: Record<string, 1 | -1> = {};
  sort[ orderByVal ] = orderParamVal;

  if ( cache && cache?.useCache ) {
    resultsList = await model.find( filter as FilterQuery<T>, null, { skip, limit, sort } ).cache( cache.cacheOptionService );
    currentPageResultsNumber = resultsList.length;
  } else {
    resultsList = await model.find( filter as FilterQuery<T>, null, { skip, limit, sort } );
    currentPageResultsNumber = resultsList.length;
  }

  if ( dataMapTo ) {
    dtoResultsList = dtoMapper<T, U>( resultsList, dataMapTo );
  }

  return {
    metadata: {
      page: pageVal,
      totalPages,
      total,
      numberPerPage: limit,
      currentPageResultsNumber,
      skipped: skip
    },
    data: dataMapTo ? dtoResultsList : resultsList
  };
}