import { Request, Response } from "express";
import { Pool } from "pg";

const invoicingClient = new Pool({
  user: "invoicinguser",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "invoicing"
});

/**
 * POST /
 * Create User
 */
export const create = (req: Request, res: Response ) => {
  const { type, name, balance } = req.body;

  invoicingClient.query("INSERT INTO users (type, name, balance) VALUES ($1, $2, $3)",
    [type, name, balance],
    (err, result) => {
      if(err) {
        console.error(err);
      }
      res.status(201).send("Successfully created new user");
    });
};

export const getAll = (req: Request, res: Response ) => {
  invoicingClient.query("SELECT * FROM users",
    (err, result) => {
      if(err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
};
