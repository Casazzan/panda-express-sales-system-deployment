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
router.get('/add', (req, res) => {
    let item_id = req.query.id;
    let item_name=req.query.name; 
    let servings=req.query.servings; 
    let restock_quantity=req.query.restock_quantity; 
    let item_price=req.query.price; 
    let food_type=req.query.food_type; 
    let minimum_amount = req.query.minimum_amount;

    const query = `INSERT INTO inventory(item_id,item_name,servings,restock_quantity,item_price,food_type,minimum_amount) VALUES (${item_id},'${item_name}',${servings},${restock_quantity},${item_price},'${food_type}',${minimum_amount})`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
            //res.render('user', data);
        });
});

router.get('/delete', (req, res) => {
    let id = req.query.id;
    const query = `DELETE FROM inventory WHERE item_id = ${id}`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
            //res.render('user', data);
        });
});

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

router.get('/restock', (req, res) => {
    const data_query = `SELECT item_id, restock_quantity FROM inventory`
    console.log(`Performing query: ${data_query}`);
    pool
        .query(data_query)
        .then(query_res => {
            // for each item; update quantity to restock_quantity
            for (let i = 0; i < query_res.rowCount; i++){
                const item = query_res.rows[i];
                const update_query = `UPDATE inventory SET servings =${item.restock_quantity} WHERE item_id=${item.item_id}`;
                console.log(`Performing query: ${update_query}`);
                pool.query(update_query);
            }
            
            res.status(200).end();
        });
    
});


router.get('/critical_restock', (req, res) => {
    const data_query = `SELECT item_id, minimum_amount, servings, restock_quantity FROM inventory`;
    console.log(`Performing query: ${data_query}`);
    pool
        .query(data_query)
        .then(query_res => {
            // for each item; update quantity to restock_quantity
            for (let i = 0; i < query_res.rowCount; i++){
                const item = query_res.rows[i];
                if(item.servings < item.minimum_amount) {
                    const update_query = `UPDATE inventory SET servings =${item.restock_quantity} WHERE item_id=${item.item_id}`;
                    console.log(`Performing query: ${update_query}`);
                    pool.query(update_query);
                }
            }
            
            res.status(200).end();
        });
    
});
module.exports = router;