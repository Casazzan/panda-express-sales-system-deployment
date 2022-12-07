var express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

var router = express.Router();

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});
/**
 * - Get Full List Of Emails <br>
 * Route: /authorized_emails/summary <br>
 * Ex: http://localhost:5003/authorized_emails/summary <br>
 * Ex Response: [{"email":"alex.m.deyoung@tamu.edu"},{"email":"casazzan@tamu.edu"},...] <br>
 *  <br>
 * - Add email <br>
 * Route:  /authorized_emails/add?email={email} <br>
 * Ex: http://localhost:5003/authorized_emails/add?email={email} <br>
 * Ex Response: No Response
 * @module
 */
router.get('/add', (req, res) => {
    let email = req.query.email;
    const query = `INSERT INTO authorized_emails(email) VALUES ('${email}')`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
            //res.render('user', data);
        });
});

router.get('/summary', (req, res) => {
    items = [];
    const query = `SELECT * FROM authorized_emails`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                items.push(query_res.rows[i]);
            }
            const data = items;
            res.send(data);
            //res.render('user', data);
        });
});

module.exports = router;
