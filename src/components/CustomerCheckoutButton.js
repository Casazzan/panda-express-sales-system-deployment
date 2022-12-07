import { send } from 'process';
import React, { Component } from 'react'
import "../index.css"

/**
 * Queries the database for the price of a dish, taking into account the dish and everything in it
 * @function
 * @param {int} dishId - the ID of the entrees dish (bowl, plate, or bigger plate).
 * @param {string} idString - string of ID's of the items inside the dish.
 * @returns {double} The price of the dish passed in.
 */
var callAPIAsyncGetPrice = async (dishId, idString) => {
    //console.log((await (await fetch(`http://localhost:5003/dish_list/price?dish_id=${dishId}${idString}`)).json()));
    const promise = fetch(`http://localhost:5003/dish_list/price?dish_id=${dishId}${idString}`);
    const response = await promise;
    const result = await response.json();
    return result.price;
}

/**
 * Calculates the price of all the dishes in the current order
 * @function
 * @param {int} MyListOfOrders - 3 Dimensional array containing the user's current order
 * @return {double} Price of all the dishes in the current order to 2 decimal places
 */
const returnPrice = async (MyListOfOrdersArray, dishName) => {
    var totalPrice = 0;
    var resultString = "";
    var dish_id = 1;
    var theIfLoopRan = 0;
    for (var i = 1; i < MyListOfOrdersArray.length; i++){
        var timesRun = 0;
        if(dishName == "bowl"){
            dish_id = 1;
        }
        else if(dishName == "plate"){
            dish_id = 2;
        }
        else if(dishName == "bigger plate"){
            dish_id = 3;
        }
        var everythingInTheDish = [];
        for (var j = 0; j < MyListOfOrdersArray[i].length; j++){
            if (MyListOfOrdersArray[i][j] === ""){
                continue;
            }
            else{
                //push all the id's
                everythingInTheDish.push(MyListOfOrdersArray[i][j]);
                timesRun = timesRun + 1;
            }
        }
        if (timesRun > 0){
            
            if (timesRun > 1){ //checking to see if array so doesn't iterate over every letter
                for (var idx = 0; idx < everythingInTheDish.length; idx++){
                    resultString += "&item=" + everythingInTheDish[idx];
                }
            }
            else{
                resultString += "&item=" + everythingInTheDish[0];
            }
            // console.log("Everything in the string sending to API: " + resultString);
            theIfLoopRan = 1; //moved the statement outside because it should only run once per dish (MyListOfOrdersArray) is all a single dish
        }
    }
    if (theIfLoopRan == 1){
        totalPrice = await callAPIAsyncGetPrice(dish_id, resultString);
    }
    return totalPrice.toFixed(2);
}

/**
 * All of the logic for sending the user's current order to the database
 * @function
 * @param {int} MyListOfOrders - 3 Dimensional array containing the user's current order 
 */
const orderTheItems = async (MyListOfOrders) => {
    for (var i = 0; i < MyListOfOrders.length; i++){
        var entrees = [];
        var entreesResultString = "";
        var entreesAmountResultString = "";
        var sides = [];
        var sidesResultString = "";
        var sidesAmountResultString = "";
        var appetizers = [];
        var appetizersResultString = "";
        var appetizersAmountResultString = "";
        var dishtype = MyListOfOrders[i][0][0];
        for (var j = 1; j < MyListOfOrders[i].length; j++){
            for (var k = 0; k < MyListOfOrders[i][j].length; k++){
                if(j == 1){
                    entrees.push(MyListOfOrders[i][j][k]);
                }
                else if (j == 2){
                    sides.push(MyListOfOrders[i][j][k]);
                }
                else if (j == 3){
                    appetizers.push(MyListOfOrders[i][j][k]);
                }
            }
        }
        
        if (Array.isArray(entrees) && entrees.length != 0){
            for (var idx = 0; idx < entrees.length - 1; idx++){
                entreesResultString += `${entrees[idx]},`;
                entreesAmountResultString += `1,`;
            }
            entreesResultString += `${entrees[entrees.length-1]}`;
            entreesAmountResultString += `1`;
        }
        else if (entrees.length != 0){
            entreesResultString += entrees[0];
            entreesAmountResultString += `1`;
        }
        else{
            entreesResultString += "NONE";
            entreesAmountResultString += "0";
        }

        if (Array.isArray(sides) && sides.length != 0){
            for (var idx = 0; idx < sides.length - 1; idx++){
                sidesResultString += `${sides[idx]},`;
                sidesAmountResultString += `1,`;
            }
            sidesResultString += `${sides[sides.length-1]}`;
            sidesAmountResultString += `1`;
        }
        else if (sides.length != 0){
            sidesResultString += sides[0];
            sidesAmountResultString += `1`;
        }
        else{
            sidesResultString += "NONE";
            sidesAmountResultString += "0";
        }

        if (Array.isArray(appetizers) && appetizers.length != 0){
            for (var idx = 0; idx < appetizers.length - 1; idx++){
                appetizersResultString += `${appetizers[idx]},`;
                appetizersAmountResultString += `1,`;
            }
            appetizersResultString += `${appetizers[appetizers.length-1]}`;
            appetizersAmountResultString += `1`;
        }
        else if (appetizers.length != 0){
            appetizersResultString += appetizers[0];
            appetizersAmountResultString += `1`;
        }
        else{
            appetizersResultString += "NONE";
            appetizersAmountResultString += "0";
        }

        // var sidesResultString = "";
        var nextID = (await (await fetch("http://localhost:5003/order_history/nextID")).json()).nextID;
        var price = await returnPrice(MyListOfOrders[i], MyListOfOrders[i][0][0]); //pass this in as the CurrentOrder[i]
        var date = "2022-11-25";
        console.log(`Order Sending: transaction_id=${nextID}&employee_id=0&date=${date}&type_of_dish=${dishtype}&entree_dish=${entreesResultString}&entree_amt_servings=${entreesAmountResultString}&side_ingredients=${sidesResultString}&side_amt_servings=${sidesAmountResultString}&appetizer_ingredients=${appetizersResultString}&appetizer_amt_servings=${appetizersAmountResultString}&price=${price}`);
        await fetch(`http://localhost:5003/order_history/add?transaction_id=${nextID}&employee_id=0&date=${date}&type_of_dish=${dishtype}&entree_dish=${entreesResultString}&entree_amt_servings=${entreesAmountResultString}&side_ingredients=${sidesResultString}&side_amt_servings=${sidesAmountResultString}&appetizer_ingredients=${appetizersResultString}&appetizer_amt_servings=${appetizersAmountResultString}&price=${price}`);
        console.log("Sent");
    }
}

/**
 * Sends the order to the database and erases the entire order in localStorage
 * @param {Component} props2 - prop containing the user's current order
 * @function
 */
const sendsOrderAndDeletesCurrentOrder = (props2) => {
    orderTheItems(props2.order);
    props2.updateOrderCallbackTwo([[[]]]);
}

/**
 * All the logic for the checkout button on the checkout screen
 * @function
 * @param {Component} props - Holds the current order, the current price, and the screen the user is currently on. Also has localStorage code for persistance when the screen is reloaded.
 */
const CustomerCheckoutButton = (props) => {
    return (
        <div id = "CheckoutText" onClick = {() => {sendsOrderAndDeletesCurrentOrder(props)}}>Checkout</div>
    )
}

export default CustomerCheckoutButton