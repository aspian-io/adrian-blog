import { Request, Response } from "express";
import { AttachmentDoc } from "models/attachments/attachment.model";
import { UserDoc } from "models/auth/auth-user.model";
import { CommentDoc } from "models/post-comments/post-comment.model";
import { PostDoc } from "models/posts/post.model";
import { SettingsDoc } from "models/settings/settings.model";
import { TaxonomyDoc } from "models/taxonomies/taxonomy.model";

export interface ILogSerializerMeta {
  user?: Partial<UserDoc>;
  post?: Partial<PostDoc>;
  taxonomy?: Partial<TaxonomyDoc>;
  attachment?: Partial<AttachmentDoc>;
  postComment?: Partial<CommentDoc>;
  settings?: Partial<SettingsDoc>;
}

/**
 * 
 * Gets log information and serializes them to a log object for Winston logger
 * 
 * @param {Request} req - Express related route's request object 
 * @param {Response} res - Express related route's response object
 * @param {string | undefined} localizedMessageKey - Translation key for localization
 * @param {ILogSerializerMeta | undefined} meta - An object including more information about the activity
 * @param {number | undefined} statusCode - For Manually status code specification
 * @return {Object} serializedLogObject - A serialized log object
 */
export const logSerializer = ( req: Request, res: Response, localizedMessageKey?: string, meta?: ILogSerializerMeta, statusCode?: number ): Object => {
  const method = req.method;
  const url = req.originalUrl;
  const status = statusCode ? statusCode : res.statusCode;
  const responseTimeFromHeader = res.getHeader( "X-Response-Time" ) ? res.getHeader( "X-Response-Time" ) : '0.00ms';
  const responseTime = responseTimeFromHeader ? parseFloat( responseTimeFromHeader.toString() ) : undefined;
  const userId = req.currentUser?.id;
  const userEmail = req.currentUser?.email;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  const localizedMsgKey = localizedMessageKey ? localizedMessageKey : "";

  return { method, url, status, responseTime, userId, userEmail, userAgent, localizedMsgKey, meta };
};