import React, { Component } from 'react'
import "../index.css"

var callAPIAsyncGetPrice = async (dishId, idString) => {
    //console.log((await (await fetch(`http://localhost:5001/dish_list/price?dish_id=${dishId}${idString}`)).json()));
    const promise = fetch(`http://localhost:5001/dish_list/price?dish_id=${dishId}${idString}`);
    const response = await promise;
    const result = await response.json();
    return result.price;
}

var addToOrderHistory = async (dishId, idString) => {
    //console.log((await (await fetch(`http://localhost:5001/dish_list/price?dish_id=${dishId}${idString}`)).json()));
    const promise = fetch(`http://localhost:5001/order_history/price?dish_id=${dishId}${idString}`);
}

const returnPrice = async (MyListOfOrders) => {
    var totalPrice = 0;
    var timesRun = 0;
    console.log("LENGTH: " + MyListOfOrders.length);
    for (var i = 0; i < MyListOfOrders.length; i++){
        console.log("RUNNING");
        var dishtype = MyListOfOrders[i][0][0];
        var dish_id = 1;
        if(dishtype == "bowl"){
            dish_id = 1;
        }
        else if(dishtype == "plate"){
            dish_id = 2;
        }
        else if(dishtype == "bigger plate"){
            dish_id = 3;
        }
        var everythingInTheDish = [];
        for (var j = 1; j < MyListOfOrders[i].length; j++){
            // if (MyListOfOrders[i][j].length == 1){
            //     everythingInTheDish.push(MyListOfOrders[i][j][0]);
            // }
            // else{
                for (var k = 0; k < MyListOfOrders[i][j].length; k++){
                    if (MyListOfOrders[i][j][k] === ""){
                        continue;
                    }
                    else{
                        //push all the id's
                        everythingInTheDish.push(MyListOfOrders[i][j][k]);
                        timesRun = timesRun + 1;
                    }
                }
            // }
        }
        if (timesRun > 0){

            var resultString = "";
            if (timesRun > 1){
                for (var idx = 0; idx < everythingInTheDish.length; idx++){
                    resultString += "&item=" + everythingInTheDish[idx];
                }
            }
            else{
                resultString += "&item=" + everythingInTheDish[0];
            }
            // console.log("Everything in the string sending to API: " + resultString);
            totalPrice = totalPrice + await callAPIAsyncGetPrice(dish_id, resultString);
            console.log("New total price: " + totalPrice);
        }

    }
    return totalPrice.toFixed(2);
}

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
        var nextID = (await (await fetch("http://localhost:5001/order_history/nextID")).json()).nextID;
        var price = await returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')));
        var date = "2022-10-25";
        console.log(`Order Sending: transaction_id=${nextID}&employee_id=0&date=${date}&type_of_dish=${dishtype}&entree_dish=${entreesResultString}&entree_amt_servings=${entreesAmountResultString}&side_ingredients=${sidesResultString}&side_amt_servings=${sidesAmountResultString}&appetizer_ingredients=${appetizersResultString}&appetizer_amt_servings=${appetizersAmountResultString}&price=${price}`);
        await fetch(`http://localhost:5001/order_history/add?transaction_id=${nextID}&employee_id=-1&date=${date}&type_of_dish=${dishtype}&entree_dish=${entreesResultString}&entree_amt_servings=${entreesAmountResultString}&side_ingredients=${sidesResultString}&side_amt_servings=${sidesAmountResultString}&appetizer_ingredients=${appetizersResultString}&appetizer_amt_servings=${appetizersAmountResultString}&price=${price}`);
        console.log("Sent");
    }
}


class CustomerCheckoutButton extends Component   {


    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // const price = await returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')));
        // const price = await returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')));
    }

    render(){
        return (
            // <div>{returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')))}</div>
            <div class = "CustomerCheckoutButton" id = "CheckoutText" onClick = {() => {orderTheItems(JSON.parse(localStorage.getItem('CurrentOrder')))}}>Checkout</div>
            // <div>Pending</div>
        )
    }
}

export default CustomerCheckoutButton