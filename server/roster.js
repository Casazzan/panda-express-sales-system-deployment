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
 * - Single Employee Query <br>
 * Route: /roster?id={id} <br>
 * Ex: http://localhost:5001/roster?id=3 <br>
 * Ex Response: {"employee_id":3,"employee_name":"Jackie Wells","is_manager":false} <br>
 *  <br>
 * - Get Full Roster <br>
 * Route: /roster/summary <br>
 * Ex: http://localhost:5001/roster/summary <br>
 * Ex Response: \[{"employee_id":3,"employee_name":"Jackie Wells","is_manager":false},...\] <br>
 *  <br>
 * - Delete Employee <br>
 * Route: /roster/delete?id={employee_id} <br>
 * Ex: http://localhost:5001/roster/delete?id=4 <br>
 * Ex Response: No response <br>
 * Note: '%20' represents a space in the database entry <br>
 *  <br>
 * - Add Employee  <br>
 * Route: roster/add?id={id}&name={employee_name}}&manager={1 for manager, 0 for not} <br>
 * Ex: http://localhost:5001/roster/add?id=3&name=Jackie%20Wells&manager=0 <br>
 * Ex Response: No response <br>
 *  <br>
 * - Get Next Available Employee ID <br>
 * Route: /roster/nextID <br>
 * Ex: http://localhost:5001/roster/nextID <br>
 * Ex Response: {"nextID":11} <br>
 *  <br>
 * - Update Type (Manager/Not) By Employee ID <br>
 * Route: /roster/update_type?id={employee_id}&manager={1 for manager, 0 for not} <br>
 * Ex: http://localhost:5001/roster/update_type?id=4&manager=1 <br>
 * Ex Response: No Response
 * @module
 */
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
