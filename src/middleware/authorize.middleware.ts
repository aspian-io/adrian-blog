import { NotAuthorizedError } from '../errors/not-authorized-error';
import { Request, Response, NextFunction } from 'express';

export const authorize = ( policies: string[] ) => {
  // authorize based on user policies
  return async ( req: Request, res: Response, next: NextFunction ) => {
    const isAuthorized = policies.some( p => {
      if ( req.currentUser ) {
        return req.currentUser.claims.includes( p )
      } else {
        return false;
      }
    } );

    if ( !isAuthorized ) {
      throw new NotAuthorizedError();
    }

    next();
  }
}