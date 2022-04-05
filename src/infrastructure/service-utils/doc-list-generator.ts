import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { commaSeparatedToArray } from "infrastructure/string-utils/comma-separated-to-array";
import { FilterQuery, Model, PopulateOptions } from "mongoose";
import { ParsedQs } from 'qs';
import { dtoMapper, IDtoMapperOption } from "./dto-mapper";

// Input params
export interface IListQueryParams<T, U = T> {
  model: Model<T>;                                                  // Mongoose Model (T is type of the Model's Document)
  fieldsToExclude?: string[];                                       // Model fields we do not want to use for filtering
  cache?: IListQueryCache;                                          // Enable or disable Redis cache for the result
  queryStringParams?: ParsedQs;                                     // Query string params to use for filtering (req.query)
  preDefinedFilters?: IListQueryPreDefinedFilters[];                // Pre-defined filters to apply
  preDefinedOrders?: IListQueryPreDefinedOrders[];                  // Pre-defined orders to apply
  fieldsToPopulate?: string[] | PopulateOptions | PopulateOptions[];// Array of field to populate
  dataMapTo?: new () => U;                                          // An instance of DTO class to map data to
  mapperOptions?: IDtoMapperOption<any>[];                               // DTO Mapper options
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
  filterParam: string | boolean | string[];
}

// Pre-defined orders type
export interface IListQueryPreDefinedOrders {
  orderBy: string;
  orderParam: 1 | -1;
}

/**
 * 
 * Generate conditional list (filtered, sorted, TimeSpanned and paginated) from a specific mongoose model
 * 
 * @param {IListQueryParams<T>} params - Params to generate conditional list of type `IListQueryParams<T>`
 * @returns {Promise<IListQueryResult<T>>} A Promise of type `IListQueryResult<T>`
 */
export async function docListGenerator<T, U = T> ( params: IListQueryParams<T, U> ): Promise<IListQueryResult<T, U>> {
  const {
    model,
    fieldsToExclude,
    queryStringParams,
    cache,
    preDefinedFilters,
    preDefinedOrders,
    dataMapTo,
    mapperOptions,
    fieldsToPopulate
  } = params;

  let modelKeys = Object.keys( model.schema.paths );
  const page = queryStringParams?.page ? parseInt( queryStringParams.page.toString() ) : 1;
  const size = queryStringParams?.size ? parseInt( queryStringParams.size.toString() ) : 10;
  const filterBy = queryStringParams?.filterBy;
  const orderBy = queryStringParams?.orderBy?.toString();
  const orderParam = queryStringParams?.orderParam ? parseInt( queryStringParams.orderParam.toString() ) : -1;
  const dateFields = modelKeys.filter( key => model.schema.path( key ).instance === "Date" );
  const arrayFields = modelKeys
    .filter( key => model.schema.path( key ).instance === "Array" && model.schema.path( key ).schema === undefined );

  if ( fieldsToExclude && fieldsToExclude.length ) {
    modelKeys = modelKeys.filter( field => !fieldsToExclude.includes( field ) );
  }

  const dateFieldsVal = dateFields && dateFields.length ? dateFields : [];
  const isFilterByArray = Array.isArray( filterBy );

  let filterByVal: string[] = [];
  if ( isFilterByArray ) {
    filterByVal = modelKeys.filter( key => filterBy.includes( key as any ) );
  } else {
    const filterByAsArray = filterBy ? [ filterBy.toString() ] : [];
    filterByVal = filterByAsArray.length
      ? modelKeys.filter( key => filterByAsArray.includes( key as any ) )
      : [];
  }

  const nonDateFilterBy = filterByVal.filter( f => !dateFieldsVal.includes( f ) );
  const dateFilterBy = filterByVal.filter( f => dateFieldsVal.includes( f ) );

  const nonDatePreDefinedFilterBY = preDefinedFilters?.filter( pdf => !dateFieldsVal.includes( pdf.filterBy ) );
  const datePreDefinedFilterBY = preDefinedFilters?.filter( pdf => dateFieldsVal.includes( pdf.filterBy ) );

  const orderByVal = orderBy && modelKeys.includes( orderBy.toString() ) ? orderBy : undefined;
  const orderParamVal = ( orderParam !== 1 && orderParam !== -1 ) ? -1 : orderParam;

  const filter: Record<string, RegExp | { $gte: Date; $lte: Date; } | { $all: string[]; } | string> = {};

  const stringBools = [ "true", "false" ];
  let resultsList: T[] = [];
  let dtoResultsList: U[] = [];
  let total = 0;
  let currentPageResultsNumber = 0;

  if ( queryStringParams && nonDateFilterBy.length ) {
    nonDateFilterBy.forEach( nonDateFilter => {
      if ( queryStringParams[ nonDateFilter ] ) {
        if ( !arrayFields.includes( nonDateFilter ) ) {
          const filterValue = isNaN( parseInt( queryStringParams[ nonDateFilter ]!.toString() ) )
            && !stringBools.includes( queryStringParams[ nonDateFilter ]!.toString() )
            ? new RegExp( queryStringParams[ nonDateFilter ]!.toString() )
            : queryStringParams[ nonDateFilter ]!.toString();
          filter[ nonDateFilter ] = filterValue;
        } else {
          let qStrParam = commaSeparatedToArray( queryStringParams[ nonDateFilter ]!.toString() );
          if ( Array.isArray( qStrParam ) ) {
            filter[ nonDateFilter ] = { $all: qStrParam };
          } else {
            filter[ nonDateFilter ] = { $all: [ qStrParam ] };
          }
        }
      }
    } );
  }

  if ( nonDatePreDefinedFilterBY && nonDatePreDefinedFilterBY.length ) {
    nonDatePreDefinedFilterBY.forEach( pdf => {
      if ( !arrayFields.includes( pdf.filterBy ) ) {
        const filterValue = isNaN( parseInt( pdf.filterParam.toString() ) )
          && !stringBools.includes( pdf.filterParam.toString() )
          ? new RegExp( pdf.filterParam.toString() )
          : pdf.filterParam.toString();
        filter[ pdf.filterBy ] = filterValue;
      } else {
        if ( Array.isArray( pdf.filterParam ) ) {
          filter[ pdf.filterBy ] = { $all: pdf.filterParam };
        } else {
          filter[ pdf.filterBy ] = { $all: [ pdf.filterParam.toString() ] };
        }
      }
    } );
  }

  if ( queryStringParams && dateFilterBy.length ) {
    dateFilterBy.forEach( dateFilter => {
      if ( queryStringParams[ dateFilter ] ) {
        let qStrParam = commaSeparatedToArray( queryStringParams[ dateFilter ]!.toString() );
        const isStartDateValid = Array.isArray( qStrParam ) && qStrParam.length === 2
          ? !isNaN( new Date( qStrParam[ 0 ].toString() ).getTime() )
          : false;
        const isEndDateValid = Array.isArray( qStrParam ) && qStrParam.length === 2
          ? !isNaN( new Date( qStrParam[ 1 ].toString() ).getTime() )
          : false;
        if ( isStartDateValid && isEndDateValid ) {
          filter[ dateFilter ] = { $gte: new Date( qStrParam[ 0 ].toString() ), $lte: new Date( qStrParam[ 1 ].toString() ) };
        }
      }
    } );
  }

  if ( datePreDefinedFilterBY && datePreDefinedFilterBY.length ) {
    datePreDefinedFilterBY.forEach( pdf => {
      let datesToArr = commaSeparatedToArray( pdf.filterParam.toString() );
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
    limit = size ? size : 10;
  }

  const totalPages = Math.ceil( total / limit );
  let pageVal = 1;
  if ( page < 1 ) {
    pageVal = 1;
  } else if ( page > totalPages ) {
    pageVal = totalPages > 0 ? totalPages : 1;
  } else {
    pageVal = page ? page : 1;
  }
  const skip = ( pageVal - 1 ) * limit;

  let sort: Record<string, 1 | -1> = {};
  if ( preDefinedOrders ) {
    preDefinedOrders.forEach( o => {
      sort[ o.orderBy ] = o.orderParam;
    } );
  }
  if ( orderByVal ) {
    sort = {};
    sort[ orderByVal ] = orderParamVal;
  }

  if ( cache && cache?.useCache ) {
    resultsList = await model
      .find( filter as FilterQuery<T>, null, { skip, limit, sort } )
      .populate( fieldsToPopulate )
      .cache( cache.cacheOptionService );
    currentPageResultsNumber = resultsList.length;
  } else {
    resultsList = await model
      .find( filter as FilterQuery<T>, null, { skip, limit, sort } )
      .populate( fieldsToPopulate );
    currentPageResultsNumber = resultsList.length;
  }

  if ( dataMapTo ) {
    dtoResultsList = dtoMapper<T, U>( resultsList, dataMapTo, mapperOptions );
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