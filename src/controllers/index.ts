import { Request, Response } from "express";

/**
 * GET /
 * Home
 */
export const index = (req: Request, res: Response) => {
  res.send("Home page response");
};