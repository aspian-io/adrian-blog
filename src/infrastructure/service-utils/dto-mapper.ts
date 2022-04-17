// /**
//  * DTOs must extends this class
//  */
export class DTOMapper {
  dtoMapperProfile (): IDtoMapperOption<any>[] | undefined {
    return undefined;
  };
}

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
 * @returns {U} An object of type U
 */
export function dtoMapper<T, U extends DTOMapper> (
  source: T extends Array<any> ? never : T,
  destination: new () => U
): U;
/**
 * 
 * Map source object to destination class
 * 
 * @param {T[]} source  - Source array of objects to map from
 * @param {U} destination - Destination class to which map each object from the source
 * @returns {U[]} An array of type U
 */
export function dtoMapper<T, U extends DTOMapper> (
  source: T[],
  destination: new () => U
): U[];

export function dtoMapper<T, U extends DTOMapper> (
  source: T | T[],
  destination: new () => U
): U | U[] {
  if ( Array.isArray( source ) ) {
    return source.map( s => {
      return mapper( s, new destination() );
    } );
  }
  return mapper( source, new destination() );
}

// Mapper to map source to destination
function mapper<T, U extends DTOMapper> ( source: T, destination: U ): U {
  Object.keys( destination ).forEach( key => {
    destination[ key as keyof U ] = <any>source[ key as keyof T ];
    if ( destination.dtoMapperProfile()?.length ) {
      destination.dtoMapperProfile()?.forEach( option => {
        // To class mapping (recursively)
        if ( option.mapToClass?.mapFromKey === key ) {
          if ( source[ key as keyof T ] ) {
            if ( Array.isArray( source[ key as keyof T ] ) ) {
              const result = Array.from( source[ key as keyof T ] as any ).map( el => {
                return mapper( el, new option.mapToClass!.dtoClass() );
              } );
              destination[ key as keyof U ] = result as any;
            } else {
              const result = mapper( source[ key as keyof T ], new option.mapToClass.dtoClass() );
              destination[ key as keyof U ] = result as any;
            }
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