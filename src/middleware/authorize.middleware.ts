import { NotAuthorizedError } from 'errors/not-authorized-error';
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from './async-handler.middleware';

export const authorize = ( policies: string[] ) => {
  // authorize based on user policies
  return asyncHandler( async ( req: Request, res: Response, next: NextFunction ) => {
    const isAuthorized = policies.some( p => {
      if ( req.currentUser ) {
        return req.currentUser.claims.includes( p );
      } else {
        return false;
      }
    } );

    if ( !isAuthorized ) {
      throw new NotAuthorizedError();
    }
    next();
  } );
};