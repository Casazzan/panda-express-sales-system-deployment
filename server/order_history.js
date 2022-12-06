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
 * - Single Order Item Query <br>
 * Route: /order_history?id={id} <br>
 * Ex: http://localhost:5001/order_history?id=3 <br>
 * Ex Response: {"transaction_id":3,"employee_id":1,"date":"2022-10-01T05:00:00.000Z","type_of_dish":"bigger plate","entree_dish":"honey_seasame_chicken,orange_chicken","entree_amt_servings":"2,4","side_ingredients":"brown_steamed_rice","side_amt_servings":5,"appetizer_ingredients":"chicken_egg_roll","appetizer_amt_servings":1,"price":"13.203985300"} <br>
 *  <br>
 * - Add Order To History <br>
 * Route: /order_history/add?transaction_id={transaction_id}&employee_id={employee_id}&date={date}&type_of_dish={type_of_dish}&entree_dish={entree_dish}&entree_amt_servings={entree_amt_servings}&side_ingredients={side_ingredients}&side_amt_servings={side_amt_servings}&appetizer_ingredients={appetizer_ingredients}&appetizer_amt_servings={appetizer_amt_servings}&price={price} <br>
 * Ex: http://localhost:5001/order_history/add?transaction_id=2&employee_id=2&date=2022-10-01&type_of_dish=plate&entree_dish=honey_seasame_chicken,orange_chicken&entree_amt_servings=4,2&side_ingredients=white_steamed_rice&side_amt_servings=2&appetizer_ingredients=chicken_egg_roll&appetizer_amt_servings=2&price=16.07 <br>
 *  <br>
 * Ex Response: No Response <br>
 *  <br>
 * - Get Next Available Order ID <br>
 * Route: /order_history/nextID <br>
 * Ex: http://localhost:5001/order_history/nextID <br>
 * Ex Response: {"nextID":5538} <br>
 *  <br>
 * - Get Full Order History <br>
 * Route: /order_history/summary <br>
 * Ex: http://localhost:5001/order_history/summary <br>
 * Ex Response: \[{"transaction_id":3,"employee_id":1,"date":"2022-10-01T05:00:00.000Z","type_of_dish":"bigger plate","entree_dish":"honey_seasame_chicken,orange_chicken","entree_amt_servings":"2,4","side_ingredients":"brown_steamed_rice","side_amt_servings":5,"appetizer_ingredients":"chicken_egg_roll","appetizer_amt_servings":1,"price":"13.203985300"},...\]
 * @module
 */
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

    // update inventory amounts
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