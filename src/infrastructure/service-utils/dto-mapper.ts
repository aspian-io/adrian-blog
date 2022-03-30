// DTO Mapper Options Type
export interface IDtoMapperOption {
  mapFromKey: string;
  mapToDtoClass: new () => Object;
}
/**
 * 
 * Map source object to destination class
 * 
 * @param {T} source - Source object to map from
 * @param {U} destination - Destination class to map to
 * @param {IDtoMapperOption[]} options - An array of DTO Mapper options of type `IDtoMapperOption[]`
 * @returns {U} An object of type U
 */
export function dtoMapper<T, U> (
  source: T extends Array<any> ? never : T,
  destination: new () => U,
  options?: IDtoMapperOption[]
): U;
/**
 * 
 * Map source object to destination class
 * 
 * @param {T[]} source  - Source array of objects to map from
 * @param {U} destination - Destination class to which map each object from the source
 * @param {IDtoMapperOption[]} options - An array of DTO Mapper options of type `IDtoMapperOption[]`
 * @returns {U[]} An array of type U
 */
export function dtoMapper<T, U> (
  source: T[],
  destination: new () => U,
  options?: IDtoMapperOption[]
): U[];

export function dtoMapper<T, U> (
  source: T | T[],
  destination: new () => U,
  options?: IDtoMapperOption[]
): U | U[] {
  if ( Array.isArray( source ) ) {
    return source.map( s => {
      return mapper( s, new destination(), options );
    } );
  }
  return mapper( source, new destination(), options );
}

// Mapper to map source to destination
function mapper<T, U> ( source: T, destination: U, options?: IDtoMapperOption[] ): U {
  Object.keys( destination ).forEach( key => {
    if ( options && options.length ) {
      options.forEach( o => {
        if ( o.mapFromKey === key ) {
          if ( source[ key as keyof T ] ) {
            const result = mapper( source[ key as keyof T ], new o.mapToDtoClass() );
            destination[ key as keyof U ] = result as any;
          }
        } else {
          destination[ key as keyof U ] = <any>source[ key as keyof T ];
        }
      } );
    } else {
      destination[ key as keyof U ] = <any>source[ key as keyof T ];
    }
  } );

  return destination;
}