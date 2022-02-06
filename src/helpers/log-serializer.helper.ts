import { Request, Response } from "express";

/**
 * 
 * Gets log information and serializes them to a log object for Winston logger
 * 
 * @param {Request} req - Express related route's request object 
 * @param {Response} res - Express related route's response object
 * @param {string | undefined} localizedMessageKey - Translation key for localization
 * @param {string | undefined} name - Name or title of the document on which an operation has done
 * @param {number | undefined} statusCode - For Manually status code specification
 * @return {Object} serializedLogObject - A serialized log object
 */
export const logSerializer = ( req: Request, res: Response, localizedMessageKey?: string, name?: string, statusCode?: number ): Object => {
  const method = req.method;
  const url = req.originalUrl;
  const status = statusCode ? statusCode : res.statusCode;
  const responseTimeFromHeader = res.getHeader( "X-Response-Time" ) ? res.getHeader( "X-Response-Time" ) : '0.00ms';
  const responseTime = responseTimeFromHeader ? parseFloat( responseTimeFromHeader.toString() ) : undefined;
  const userId = req.currentUser?.id;
  const userEmail = req.currentUser?.email;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  const localizedMsgKey = localizedMessageKey ? localizedMessageKey : "";

  return { method, url, status, responseTime, userId, userEmail, userAgent, localizedMsgKey, name };
};