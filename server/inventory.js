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
    let name = req.query.name;
    let query;
    if(id){
        query = `SELECT * FROM inventory where item_id = ${id}`;
    }
    else {
        query = `SELECT * FROM inventory where item_name = '${name}'`;
    }
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            const data = query_res.rows[0];
            res.send(data);
            //res.render('user', data);
        });
});

// TODO: add new item to inventory

router.get('/subtract', (req, res) => {
    let id = req.query.id;
    let servings = req.query.servings;
    const query = `UPDATE inventory SET servings = servings - ${servings} WHERE item_id=${id}`
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
        });
});

router.get('/update_servings', (req, res) => {
    let id = req.query.id;
    let servings = req.query.servings;
    const query = `UPDATE inventory SET servings =${servings} WHERE item_id=${id}`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
        });
});

router.get('/update_price', (req, res) => {
    let id = req.query.id;
    let newPrice = req.query.price;
    const query = `UPDATE inventory SET item_price = ${newPrice} WHERE item_id=${id}`
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
        });
});

router.get('/summary', (req, res) => {
    items = [];
    const query = `SELECT * FROM inventory`;
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
    const query = `SELECT max(item_id) FROM inventory`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            const data = query_res.rows[0];
            res.send({"nextID": data.max + 1});
        });
});
module.exports = router;