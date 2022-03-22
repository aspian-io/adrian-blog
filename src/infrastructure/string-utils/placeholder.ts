/**
 * Placeholder utils for SMS or Email templates etc.
 */
export class PlaceHolder {
  /**
   * 
   * Get template placeholder props
   * 
   * @param {string} template - The template containing placeholders
   * @returns {string[]} Template placeholder props
   */
  static getProps ( template: string ): string[] {
    const props: string[] = [];
    template.replace( /\{{(.*?)\}}/g, ( match, property ) => {
      props.push( property );
      return match;
    } );
    return props;
  }

  /**
   * 
   * Get sms pattern placeholder props
   * 
   * @param {string} template - The template containing placeholders
   * @returns {string[]} Template placeholder props
   */
  static getSMSPatternProps ( template: string ): string[] {
    const props: string[] = [];
    template.replace( /\%(.*?)\%/g, ( match, property ) => {
      props.push( property );
      return match;
    } );
    return props;
  }

  /**
   * 
   * Get meaningful text created by using the template
   * 
   * @param {string} template - The template containing placeholders
   * @param {{ [ key: string ]: any; }} dataSource - Data source to replace placeholders with expected data
   * @returns {string} Meaningful text created from the template and related data
   */
  static replaceWith ( template: string, dataSource: { [ key: string ]: any; } ): string {
    let result = '';
    result += template.replace( /\{{(.*?)\}}/g, ( match, property ) => {
      return dataSource[ property.toString().trim() ];
    } );
    console.log( "RESULT IS: ", result );
    return result;
  }

  /**
   * 
   * Get meaningful text created by using the sms pattern
   * 
   * @param {string} template - The template containing placeholders
   * @param {{ [ key: string ]: any; }} dataSource - Data source to replace placeholders with expected data
   * @returns {string} Meaningful text created from the template and related data
   */
  static replaceSMSPatternPropsWith ( template: string, dataSource: { [ key: string ]: any; } ): string {
    let result = '';
    result += template.replace( /\{{(.*?)\}}/g, ( match, property ) => {
      return dataSource[ property.toString().trim() ];
    } );
    console.log( "RESULT IS: ", result );
    return result;
  }
}