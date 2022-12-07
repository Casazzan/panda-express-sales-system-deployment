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
    const query = `SELECT * FROM dish_list where dish_id = ${id}`;
    console.log(`Performing query: ${query}`);
    pool
        .query(query)
        .then(query_res => {
            const data = query_res.rows[0];
            res.send(data);
        });
});

async function getItemByName(name) {
    const query = `SELECT * FROM inventory where item_name = '${name}'`; // <--- NATHAN I CHANGED THIS from item_id to item_name <----
    console.log(`Performing query: ${query}`);
    let query_res = await pool.query(query);
    return query_res.rows[0];
}

async function getItemByID(id) {
    const query = `SELECT * FROM inventory where item_id = ${id}`; // <--- NATHAN I CHANGED THIS from item_id to item_name <----
    console.log(`Performing query: ${query}`);
    let query_res = await pool.query(query);
    return query_res.rows[0];
}


async function getDish(id) {
    const query = `SELECT * FROM dish_list where dish_id = ${id}`; 
    console.log(`Performing query: ${query}`);
    let query_res = await pool.query(query);
    return query_res.rows[0];
}

router.get('/summary', (req, res) => {
    items = [];
    const query = `SELECT * FROM dish_list`;
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

// http://localhost:5000/dish_list/price?dish_id=1&item=1&item=2&item=14&item=15&item=20
// http://localhost:5000/dish_list/price?dish_id=1&item=honey_seasame_chicken&item=black_pepper_angus_steak&item=fried_rice
router.get('/price', async (req, res) => {
    let dishId = req.query.dish_id;
    let dish = await getDish(dishId); 

    let finalPrice = Number(dish.price);

    if(!req.query.item) {
        res.send({"price": finalPrice});
        return;
    }

    
    let itemIDList = req.query.item;
    let itemPromiseList = [];
    if(Array.isArray(itemIDList)){ //Have to Check if it's an array or else when there's a single item it iterates over every letter
        for(let i = 0; i < itemIDList.length; i++) {
            itemPromiseList.push(getItemByName(itemIDList[i]));
        }
    }
    else{
        itemPromiseList.push(getItemByName(itemIDList));
    }

    const itemList = await Promise.all(itemPromiseList);

    let entrees = [];
    let sides = [];
    let appetizers = [];

    for(let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        if (item.food_type === 'undefined') entrees.push(item);
        else if(item.food_type === 'entree') entrees.push(item);
        else if(item.food_type === 'side') sides.push(item);
        else appetizers.push(item);
    }
    
    for(let i = dish.number_entrees; i < entrees.length; i++){
        console.log("Entrees: " + entrees[i].item_price);
        finalPrice += Number(entrees[i].item_price);
    }
    for(let i = dish.number_sides; i < sides.length; i++)
        finalPrice += Number(sides[i].item_price);
    for(let i = 0; i < appetizers.length; i++)
        finalPrice += Number(appetizers[i].item_price);

    console.log("finalPrice: " + finalPrice);
    res.send({"price": finalPrice});
})

router.get('/price_by_id', async (req, res) => {
    let dishId = req.query.dish_id;
    let dish = await getDish(dishId); 

    let finalPrice = Number(dish.price);

    if(!req.query.item) {
        res.send({"price": finalPrice});
        return;
    }

    let itemIDList = req.query.item;
    let itemPromiseList = [];
    for(let i = 0; i < itemIDList.length; i++) {
        itemPromiseList.push(getItemByID(itemIDList[i]));
    }

    const itemList = await Promise.all(itemPromiseList);

    console.log(itemIDList);
    console.log(itemList);
    let entrees = [];
    let sides = [];
    let appetizers = [];

    for(let i = 0; i < itemList.length; i++) {
        let item = itemList[i];
        if(item.food_type === 'entree') entrees.push(item);
        else if(item.food_type === 'side') sides.push(item);
        else appetizers.push(item);
    }

    for(let i = dish.number_entrees; i < entrees.length; i++)
        finalPrice += Number(entrees[i].item_price);
    for(let i = dish.number_sides; i < sides.length; i++)
        finalPrice += Number(sides[i].item_price);
    for(let i = 0; i < appetizers.length; i++)
        finalPrice += Number(appetizers[i].item_price);

    res.send({"price": finalPrice});
})

module.exports = router;