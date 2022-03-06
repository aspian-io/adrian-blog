import sanitizeHtml from 'sanitize-html';
import { sanitizeHtmlOptions } from "infrastructure/security/html-allowed.infra";
import { settingGetValueService } from 'services/settings/get-value.service';
import { SettingsKeyEnum } from 'models/settings/settings.model';
import { commaSeparatedToArray } from 'infrastructure/string-utils/comma-separated-to-array.infra';

export interface ICommentProcessorParams {
  title: string;
  content: string;
}

export interface ICommentProcessorResult {
  sanitizedTitle: string;
  sanitizedContent: string;
  isApproved: boolean;
}

/**
 * 
 * Process comment based on the post comment's settings and sanitize it
 * 
 * @param {ICommentProcessorParams} data - An object including title and content of a comment
 * @returns {Promise<ICommentProcessorResult>} A promise of an object including sanitized title and content and approval setting
 */
export async function postCommentProcessor ( data: ICommentProcessorParams ): Promise<ICommentProcessorResult> {
  const { title, content } = data;
  let sanitizedTitle = sanitizeHtml( title, sanitizeHtmlOptions );
  let sanitizedContent = sanitizeHtml( content, sanitizeHtmlOptions );
  let isApproved = await settingGetValueService( SettingsKeyEnum.COMMENT_IS_APPROVED ) === "true";
  const forbiddenExps = commaSeparatedToArray( await settingGetValueService( SettingsKeyEnum.COMMENT_FORBIDDEN_EXPRESSIONS ) );
  const suspIfForbidden = ( await settingGetValueService( SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND ) ) === "true";

  forbiddenExps.map( exp => {
    const titleForbidden = sanitizedTitle.includes( exp );
    const contentForbidden = sanitizedContent.includes( exp );
    if ( titleForbidden || contentForbidden ) {
      if ( isApproved && suspIfForbidden ) {
        isApproved = false;
      }
      if ( isApproved && !suspIfForbidden ) {
        sanitizedTitle = titleForbidden ? sanitizedTitle.replace( exp, '...' ) : sanitizedTitle;
        sanitizedContent = contentForbidden ? sanitizedContent.replace( exp, '...' ) : sanitizedContent;
      }
    }
  } );

  return {
    sanitizedTitle,
    sanitizedContent,
    isApproved
  };
}