import { Request, Response } from "express";
import { createDbPool  } from "../dbClient";

/**
 * GET /
 * Merchant Dashboard
 */
export const index = (req: Request, res: Response) => {
  const dbPool = createDbPool();
  dbPool.query("SELECT * FROM invoices WHERE merchant_id = $1",
    [req.params.id],
    (err, results) => {
    if(err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
  dbPool.end().catch(err => err);
};