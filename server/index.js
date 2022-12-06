const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Import routes
const inventory = require('./inventory');
const roster = require('./roster');
const dish_list = require('./dish_list');
const order_history = require('./order_history');
const report = require('./report');
const emails = require('./authorized_emails');
const cors = require("cors");

// Create express app
const app = express();
const port = 5001;
// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});
     
app.set("view engine", "ejs");
app.use(cors());

app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            // res.render('user', data);
        });
});

app.use('/inventory', inventory);
app.use('/roster', roster);
app.use('/order_history', order_history);
app.use('/dish_list', dish_list);
app.use('/report', report);
app.use('/authorized_emails', emails);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});