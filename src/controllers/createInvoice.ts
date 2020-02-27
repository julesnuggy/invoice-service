import { Request, Response } from "express";
import { createDbPool  } from "../dbClient";

const createInvoice= (req: Request) => {
  const dbPool = createDbPool();
  const {invoiceUuid, merchant, customer, subtotal, discount, grandTotal, status} = req.body;
  dbPool.query(`
      INSERT INTO invoices(id, merchant_id, customer_id, subtotal, discount, grand_total, status) 
      VALUES (
        $1,
        (SELECT id FROM users WHERE name=$2 AND type='MERCHANT'),
        (SELECT id FROM users WHERE name=$3 AND type='CUSTOMER'),
        $4,
        $5,
        $6,
        $7
      );
    `,
    [invoiceUuid, merchant, customer, subtotal, discount, grandTotal, status],
    (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
};

const createInvoiceLines = (req: Request, invoiceUuid: string) => {
  const dbPool = createDbPool();
  req.body.invoiceLineItems.map((line: any) => {
    const {item, quantity, price, total} = line;
    dbPool.query(`
      INSERT INTO invoice_lines(invoice_id, item, quantity, price, total)
      VALUES ($1,$2,$3,$4,$5);
    `,
      [invoiceUuid, item, quantity, price, total],
      (err) => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
  });
};

/**
 * POST /
 * Create Invoice
 */
export const create = (req: Request, res: Response ) => {
  const dbPool = createDbPool();
  const {invoiceUuid} = req.body;
  (async () => {
    await createInvoice(req);
    await createInvoiceLines(req, invoiceUuid);
    await dbPool.end();
    res.status(201).send("Successfully created new invoice.");
  })();

};
