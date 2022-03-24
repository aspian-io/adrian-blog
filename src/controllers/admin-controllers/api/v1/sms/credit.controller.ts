import { Request, Response } from "express";
import { smsCreditService } from "services/sms/sms-credit.service";

export async function adminSmsCreditController ( req: Request, res: Response ) {
  const credit = await smsCreditService();
  res.send( credit );
}