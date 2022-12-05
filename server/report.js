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

async function getServingsUsed(startDate, endDate) {
    const servingsMap = new Map();
    const query = `SELECT entree_dish,entree_amt_servings,side_ingredients,side_amt_servings,appetizer_ingredients,appetizer_amt_servings FROM order_history WHERE date >= '${startDate}' AND date   <= '${endDate}'`;
    console.log(`Performing query: ${query}`);
    let query_res = await pool.query(query)
        for (let i = 0; i < query_res.rowCount; i++){
            let row = await query_res.rows[i];
            parseParallelStrings(row.entree_dish, row.entree_amt_servings, servingsMap);
            parseParallelStrings(row.side_ingredients, row.side_amt_servings, servingsMap);
            parseParallelStrings(row.appetizer_ingredients, row.appetizer_amt_servings, servingsMap);
        }
        return servingsMap;
}

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

async function getInventoryRestock() {
    const query = `SELECT item_name, restock_quantity FROM inventory`;
    console.log(`Performing query: ${query}`);
    const items = []
    const query_res = await pool.query(query)
    for (let i = 0; i < query_res.rowCount; i++){
        items.push(await query_res.rows[i]);
    }
    return items;
}

router.get('/excess', async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let servingsMap = await getServingsUsed(startDate, endDate);
    let restockList = await getInventoryRestock();
    
    const excessItemsList = [];
    for(i = 0; i < restockList.length; i++) {
        const item = restockList[i];
        if(!servingsMap.has(item.item_name)) {
            excessItemsList.push({"item_name": item.item_name, "restock_quantity":item.restock_quantity, "servings_used": 0});
        }
        else if(item.restock_quantity / 10 > servingsMap.get(item.item_name)){
            excessItemsList.push({"item_name": item.item_name, "restock_quantity":item.restock_quantity, "servings_used": servingsMap.get(item.item_name)});
        }
    }

    res.send(excessItemsList);
});

router.get('/restock', (req, res) => {
    const query = `SELECT item_name, minimum_amount, servings, restock_quantity FROM inventory`;
    console.log(`Performing query: ${query}`);
    let items = [];
    pool
        .query(query)
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                const item = query_res.rows[i];
                if(item.servings < item.minimum_amount)
                    items.push(item);
            }
            res.send(items);
        });
});


router.get('/sales', (req, res) => {
    const query = `SELECT type_of_dish, count(*), SUM(price) FROM order_history GROUP BY type_of_dish ORDER BY count(*) DESC LIMIT 10`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            res.send(query_res.rows);
        });
});

async function whatSellsTogether(startDate, endDate) {
    const salesMap = new Map();
    const query = `SELECT entree_dish, side_ingredients FROM order_history WHERE date >= '${startDate}' AND date   <= '${endDate}'`;
    console.log(`Performing query: ${query}`);
    let query_res = await pool.query(query);

    for (let i = 0; i < query_res.rowCount; i++){
        const row = await query_res.rows[i];
        const description = `Entree: ${row.entree_dish}, Side: ${row.side_ingredients}`;
        salesMap.set(description, salesMap.get(description) + 1 || 1);
    }
    console.log(salesMap);
    return [...salesMap.entries()].sort((a, b) => b[1] - a[1]); // sort by key values
}

router.get('/sells_together', async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    res.send(await whatSellsTogether(startDate, endDate));
});
// TODO: sales by item

module.exports = router;