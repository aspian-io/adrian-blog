import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * 
 * Handle errors of an Express request handler
 * 
 * @param {RequestHandler} fn - 
 * @returns Asynchronous error handled request handler
 */
export const asyncHandler = ( fn: RequestHandler ) =>
  ( req: Request, res: Response, next: NextFunction ) => Promise.resolve( fn( req, res, next ) ).catch( next );