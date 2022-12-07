import React, { Component } from 'react'
import "../index2.css"

// var callAPIAsyncNameToID = async (itemName) => {
//     (await fetch(`http://localhost:5003/inventory/${itemName}`)).text();
// }

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


class TotalPrice extends Component   {


    constructor(props) {
        super(props);
        this.state = {price: ""}
    }

    async componentDidMount() {
        const price = await returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')));
        this.setState({price: price});
    }

    render(){
        return (
            // <div>{returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')))}</div>
            <span id = "ServerPriceSpan">Price: {this.state.price}</span>
            // <div>Pending</div>
        )
    }
}

export default TotalPrice