import React, { Component } from 'react'
import "../index.css"

// var callAPIAsyncNameToID = async (itemName) => {
//     (await fetch(`http://localhost:5000/inventory/${itemName}`)).text();
// }

var callAPIAsyncGetOrderHistory = async () => {
    //console.log((await (await fetch(`http://localhost:5000/dish_list/price?dish_id=${dishId}${idString}`)).json()));
    const promise = fetch(`http://localhost:5000/order_history/summmary`);
    const response = await promise;
    const result = await response.json();
    return result.orderHistory;
}

const returnOrderHistory = async () => {
  console.log("Retrieved Order History");
  return await callAPIAsyncGetOrderHistory();
}

class ManagerOrderHistory extends Component   {


    constructor(props) {
        super(props);
        this.state = {orderHistory: ""}
    }

    async componentDidMount() {
        const orderHistory = await returnOrderHistory();
        this.setState({orderHistory: orderHistory});
    }

    render(){
        return (
            // <div>{returnPrice(JSON.parse(localStorage.getItem('CurrentOrder')))}</div>
            <span id = "Summary">Order History: {this.state.orderHistory}</span>
            // <div>Pending</div>
        )
    }
}

export default ManagerOrderHistory
