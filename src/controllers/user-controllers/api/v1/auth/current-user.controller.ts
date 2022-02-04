import { Request, Response } from 'express';

export async function currentUserController ( req: Request, res: Response ) {
  res.send( { currentUser: req.currentUser || null } );
};