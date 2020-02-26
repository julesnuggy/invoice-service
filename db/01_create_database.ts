import { Client } from 'pg';

const postgresClient = new Client({
  user: 'invoicinguser',
  password: 'password',
  host: 'localhost',
  database: 'postgres',
});

postgresClient.query('CREATE DATABASE invoicing').then(res => console.log('create db', res));
postgresClient.end();

const invoicingClient = new Client({
  user: 'invoicinguser',
  password: 'password',
  host: 'localhost',
  database: 'invoicing',
});

invoicingClient.query(`
CREATE TABLE invoices (
id SERIAL PRIMARY KEY,
item VARCHAR(255),
quantity INT,
price FLOAT8,
total FLOAT8
);
`);

const myfunc = async  () => await invoicingClient.query('SELECT * FROM invoicing;');

myfunc().then(res => console.log(res));

invoicingClient.end();
