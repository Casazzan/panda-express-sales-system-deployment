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

var addToOrderHistory = async (dishId, idString) => {
    //console.log((await (await fetch(`http://localhost:5003/dish_list/price?dish_id=${dishId}${idString}`)).json()));
    const promise = fetch(`http://localhost:5003/dish_list/price?dish_id=${dishId}${idString}`);
}

/**
 * Calculates the price of all the dishes in the current order
 * @function
 * @param {int} MyListOfOrders - 3 Dimensional array containing the user's current order
 * @return {double} Price of all the dishes in the current order to 2 decimal places
 */
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

/**
 * Calculates the price of all the dishes in the current order
 */
class CustomerTotalPrice extends Component   {

    /**
     * Calculates the price of all the dishes in the current order
     * @constructor
     * @param {props} props - 3 Dimensional array containing the user's current order
     */
    constructor(props) {
        super(props);
        this.state = {price: ""}
    }
    /**
     * When the screen is reloaded, makes sure the price is reloaded and displays again.
     * @function
     */
    async componentDidMount() {
        const price = await returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')));
        this.setState({price: price});
    }
    
    render(){
        return (
            // <div>{returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')))}</div>
            <span id = "PriceSpan">Price: {this.state.price}</span>
        )
    }
}

export default CustomerTotalPrice