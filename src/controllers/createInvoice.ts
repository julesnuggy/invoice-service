import { Request, Response } from "express";

/**
 * POST /
 * Create Invoice
 */
export const create = (req: Request, res: Response ) => {
  console.log("create invoice request", req.body);
  res.send("Create invoice POST response");
};
