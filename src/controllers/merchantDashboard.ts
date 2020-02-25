import { Request, Response } from "express";

/**
 * GET /
 * Merchant Dashboard
 */
export const index = (req: Request, res: Response) => {
  res.send("Merchant Dashboard repsonse");
};