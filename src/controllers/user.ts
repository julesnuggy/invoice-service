import { Request, Response } from "express";
import { createDbPool  } from "../dbClient";


/**
 * POST /
 * Create User
 */
export const create = (req: Request, res: Response ) => {
  const dbPool = createDbPool();
  const { type, name, balance } = req.body;

  dbPool.query("INSERT INTO users (type, name, balance) VALUES ($1, $2, $3)",
    [type, name, balance],
    (err, result) => {
      if(err) {
        console.error(err);
      }
      res.status(201).send("Successfully created new user");
    });
  dbPool.end().catch(err => err);
};

export const getAll = (req: Request, res: Response ) => {
  const dbPool = createDbPool();
  dbPool.query("SELECT * FROM users",
    (err, result) => {
      if(err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  dbPool.end().catch(err => err);
};
