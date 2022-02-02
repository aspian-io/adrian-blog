import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface UserPayload {
  id: string;
  email: string;
  claims: string[];
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ( !req.headers.authorization ) {
    return next()
  }

  try {
    const payload = ( jwt.verify( req.headers.authorization, process.env.JWT_KEY! ) ) as UserPayload;
    req.currentUser = { id: payload.id, email: payload.email, claims: payload.claims };
  } catch ( error ) { }

  next();
};