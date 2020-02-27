import { Pool } from "pg";

export const createDbPool = () => (
  new Pool({
    user: "invoicinguser",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "invoicing"
  })
);