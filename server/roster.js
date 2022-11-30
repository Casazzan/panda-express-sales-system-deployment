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

router.get('/', (req, res) => {
    let id = req.query.id;
    const query = `SELECT * FROM roster where employee_id = ${id}`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            const data = query_res.rows[0];
            res.send(data);
            //res.render('user', data);
        });
});

router.get('/delete', (req, res) => {
    let id = req.query.id;
    const query = `DELETE FROM roster WHERE employee_id = ${id}`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
            //res.render('user', data);
        });
});

router.get('/add', (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    let manager = req.query.manager == 0 ? 'f':'t';
    const query = `INSERT INTO roster(employee_id, employee_name, is_manager) VALUES (${id},'${name}','${manager}')`;
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
    const query = `SELECT * FROM roster`;
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

router.get('/nextID', (req, res) => {
    const query = `SELECT max(employee_id) FROM roster`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            const data = query_res.rows[0];
            res.send({"nextID": data.max + 1});
            //res.render('user', data);
        });
});

router.get('/update_type', (req, res) => {
    let id = req.query.id;
    let type = req.query.manager == 0 ? 'f':'t';
    const query = `UPDATE roster SET is_manager = '${type}' where employee_id = ${id}`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
            //res.render('user', data);
        });
});

module.exports = router;
