/**
 * DTO Mapper Option Type
 * @param T - Type of class
 */
export interface IDtoMapperOption<T> {
  mapToClass?: IDtoMapperToClass<T>;
  mapToPath?: IDtoMapperToPath;
}

// Mapping to class type
export interface IDtoMapperToClass<T> {
  mapFromKey: string;
  dtoClass: new () => T;
}
// mapping to path type
export interface IDtoMapperToPath {
  mapFromKey: string;
  valueFromPath: string;
}

/**
 * 
 * Map source object to destination class
 * 
 * @param {T} source - Source object to map from
 * @param {U} destination - Destination class to map to
 * @param {IDtoMapperOption<any>[]} options - An array of DTO Mapper options of type `IDtoMapperOption<any>[]`
 * @returns {U} An object of type U
 */
export function dtoMapper<T, U> (
  source: T extends Array<any> ? never : T,
  destination: new () => U,
  options?: IDtoMapperOption<any>[]
): U;
/**
 * 
 * Map source object to destination class
 * 
 * @param {T[]} source  - Source array of objects to map from
 * @param {U} destination - Destination class to which map each object from the source
 * @param {IDtoMapperOption<any>[]} options - An array of DTO Mapper options of type `IDtoMapperOption<any>[]`
 * @returns {U[]} An array of type U
 */
export function dtoMapper<T, U> (
  source: T[],
  destination: new () => U,
  options?: IDtoMapperOption<any>[]
): U[];

export function dtoMapper<T, U> (
  source: T | T[],
  destination: new () => U,
  options?: IDtoMapperOption<any>[]
): U | U[] {
  if ( Array.isArray( source ) ) {
    return source.map( s => {
      return mapper( s, new destination(), options );
    } );
  }
  return mapper( source, new destination(), options );
}

// Mapper to map source to destination
function mapper<T, U> ( source: T, destination: U, options?: IDtoMapperOption<any>[] ): U {
  Object.keys( destination ).forEach( key => {

    destination[ key as keyof U ] = <any>source[ key as keyof T ];
    if ( options && options.length ) {
      options.forEach( option => {
        // To class mapping (recursively)
        if ( option.mapToClass?.mapFromKey === key ) {
          if ( source[ key as keyof T ] ) {
            const result = mapper( source[ key as keyof T ], new option.mapToClass.dtoClass(), options );
            destination[ key as keyof U ] = result as any;
          }
          // To value mapping
        } else if ( option.mapToPath?.mapFromKey === key ) {
          let sourceVal: any;
          if ( Array.isArray( option.mapToPath.valueFromPath.split( '.' ) ) ) {
            const paths = option.mapToPath.valueFromPath.split( '.' );
            paths.forEach( p => {
              if ( !sourceVal ) {
                sourceVal = source[ p as keyof T ];
              } else {
                sourceVal = sourceVal[ p ];
              }
            } );
          } else {
            sourceVal = <any>source[ option.mapToPath.valueFromPath as keyof T ];
          }
          
          destination[ key as keyof U ] = sourceVal;
        }
      } );
    }
  } );
  return destination;
}