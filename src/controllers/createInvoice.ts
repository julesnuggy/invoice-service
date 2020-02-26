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
 * Create Invoice
 */
export const create = (req: Request, res: Response ) => {
  req.body.invoiceLineItems.map((line: any) => {
    const { item, quantity, price, total } = line;

    // qq - need to create invoice first due to PKEY/FKEY constraint
    /**
     BEGIN TRANSACTION;
     INSERT INTO invoices(merchant_id, customer_id, subtotal, discount, grand_total, status) VALUES (
     (SELECT id FROM users WHERE name=$1),
     (SELECT id FROM users WHERE name=$2),
     $3,
     $4,
     $5,
     $6
     );

     INSERT INTO invoice_lines(invoice_id, item, quantity, price, total) VALUES (
     'Get invoice_id from return value of results.row from previous query',
     $1,
     $2,
     $3,
     $4
     );

     COMMIT;
     */

    invoicingClient.query("INSERT INTO invoice_lines (item, quantity, price, total) VALUES ($1, $2, $3, $4)",
    [item, quantity, price, total],
    (err, result) => {
      if(err) {
        throw err;
      }
      res.status(201).send(`Successfully created new invoice: ${result}`);
    });
  });
};
