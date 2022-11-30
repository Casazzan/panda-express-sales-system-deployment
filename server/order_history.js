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
    const query = `SELECT * FROM order_history where transaction_id = ${id}`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            const data = query_res.rows[0];
            res.send(data);
            //res.render('user', data);
        });
});

function parseParallelStrings(itemList, servingList, map) {
    itemArr = itemList.split(",");
    servingArr = servingList.toString().split(",").map(Number);
    for(i = 0; i < itemArr.length; i++) {
        if(map.has(itemArr[i]))
            map.set(itemArr[i], map.get(itemArr[i]) + servingArr[i]);
        else
            map.set(itemArr[i], servingArr[i]);
    }
}

router.get('/add', (req, res) => {
    let transaction_id = req.query.transaction_id;
    let employee_id = req.query.employee_id;
    let date = req.query.date;
    let type_of_dish = req.query.type_of_dish;
    let entree_dish = req.query.entree_dish;
    let entree_amt_servings = req.query.entree_amt_servings;
    let side_ingredients = req.query.side_ingredients;
    let side_amt_servings = req.query.side_amt_servings;
    let appetizer_ingredients = req.query.appetizer_ingredients;
    let appetizer_amt_servings = req.query.appetizer_amt_servings;
    let price = req.query.price;
    const query = `INSERT INTO order_history(transaction_id,employee_id,date,type_of_dish,entree_dish,entree_amt_servings,side_ingredients,side_amt_servings,appetizer_ingredients,appetizer_amt_servings,price) VALUES (${transaction_id},${employee_id},'${date}','${type_of_dish}','${entree_dish}','${entree_amt_servings}','${side_ingredients}','${side_amt_servings}','${appetizer_ingredients}','${appetizer_amt_servings}',${price})`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.status(200).end();
            //res.render('user');
        });

    // TODO: update inventory amounts
    const itemAmountMap = new Map();
    parseParallelStrings(entree_dish, entree_amt_servings, itemAmountMap);
    parseParallelStrings(side_ingredients, side_amt_servings, itemAmountMap);
    parseParallelStrings(appetizer_ingredients, appetizer_amt_servings, itemAmountMap);

    itemAmountMap.forEach((servings, name) => {
        const updateQuery = `UPDATE inventory SET servings = servings - ${servings} WHERE item_name='${name}'`;
        console.log(`Performing query: ${updateQuery}`);
        pool.query(updateQuery);
    })
    
});

router.get('/nextID', (req, res) => {
    const query = `SELECT max(transaction_id) FROM order_history`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            const data = query_res.rows[0];
            res.send({"nextID": data.max + 1});
            //res.render('user', data);
        });
});

router.get('/summary', (req, res) => {
    items = [];
    const query = `SELECT * FROM order_history`;
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