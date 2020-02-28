# Aerarium (Invoice UI)

## Introduction
Aerarium is a web app which allows (read: is intended to allow) merchants and their customers to manage the end-to-end 
lifecycle of transactions.

## Installation
* Clone both **invoice-ui** and **invoice-service** repos
    * https://github.com/julesnuggy/invoice-ui
    * https://github.com/julesnuggy/invoice-service
* Run `npm install` on both repos
* Setup a local PostgreSQL database by doing the following:
    * Install PostgreSQL if you haven't already
    * You can then do the following in the `psql` CLI or using the `pgAdmin` GUI
    
    * If using the `psql` CLI, run: 
        ```
        ### In your CLI
         
        $ psql -U postgres
        # Enter your admin password
        
        # You will now be connected to your psql Postgres management DB
        $ CREATE ROLE invoicinguser WITH LOGIN PASSWORD 'password';
        $ ALTER ROLE invoicinguser CREATEDB;
        $ CREATE DATABASE invoicing;
        $ \c invoicing
        $ CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        $ \q

        # You will now be back in your command line
        $ psql -d invoicing -U invoicinguser
        # Enter the user password
        # Please go to the SQL script at ./db/database_setup.sql and copy and paste the code from there into psql 
      ```
    * If using pgAdmin, login as the admin into the Postgres DB and do the same setup as above for the ROLE, DB and EXTENSION
    * Then login as `invoicinguser` to the `invoicing` database, and run a query with the script in `./db/database_setup.sql`
    
* Spin up this server-side by running `npm run all`
* Run the front-end by running `npm start` in **invoice-ui**
* Navigate to http://localhost:3000 (should open automatically)