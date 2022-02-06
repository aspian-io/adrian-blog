import { Request, Response, NextFunction } from 'express';
import { NotAuthenticatedError } from '../errors/not-authenticated-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ( !req.currentUser ) {
    throw new NotAuthenticatedError();
  }
  next();
};