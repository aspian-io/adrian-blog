import { Request, Response } from 'express';

export async function authCurrentUserController ( req: Request, res: Response ) {
  res.send( { currentUser: req.currentUser || null } );
};