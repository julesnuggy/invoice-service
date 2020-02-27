--psql -U postgres
--[enter password]
CREATE ROLE invoicinguser WITH LOGIN PASSWORD 'password';
ALTER ROLE invoicinguser CREATEDB;
CREATE DATABASE invoicing;
-- \c invoicing
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--\q
------------------

--psql -d invoicing -U invoicinguser
--[enter password]
CREATE TABLE users (
id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
type VARCHAR(60),
name VARCHAR(255),
balance FLOAT8
);

CREATE TABLE accounts (
account_id UUID NOT NULL DEFAULT uuid_generate_v4(),
user_id UUID REFERENCES users(id),
username VARCHAR(255),
password VARCHAR(255),
PRIMARY KEY(account_id, user_id)
);

CREATE TABLE invoices (
id UUID PRIMARY KEY NOT NULL,
merchant_id UUID,
customer_id UUID,
subtotal FLOAT8,
discount FLOAT8,
grand_total FLOAT8,
status VARCHAR(60)
);

CREATE TABLE invoice_lines (
invoice_line_id UUID NOT NULL DEFAULT uuid_generate_v4(),
invoice_id UUID REFERENCES invoices(id),
item VARCHAR(255),
quantity INT,
price FLOAT8,
total FLOAT8,
PRIMARY KEY(invoice_line_id, invoice_id)
);

