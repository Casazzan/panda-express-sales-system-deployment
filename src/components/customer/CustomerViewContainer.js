import React from 'react'
import CustomerDishChoiceCurrentOrder from './CustomerDishChoiceCurrentOrder';
import Container from "../../customer/container";
import CustomerMenu from './CustomerMenu';
import CustomerCheckout from '../CustomerCheckout';
import '../../index.css';

class CustomerViewContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentOrder: [],
            price: "",
            screen: "container"
        };
        //Alex code for persistance
        var currentOrderFromLocalStorage = JSON.parse(localStorage.getItem("CurrentOrder"));
        if (currentOrderFromLocalStorage == null) {
            console.log("The list doesn't exist");
            localStorage.setItem('CurrentOrder', JSON.stringify([[[]]]));
        }
        else{
            this.state.currentOrder = currentOrderFromLocalStorage;
        }
    }

    componentDidMount() {  
        this.updatePrice(this.state.currentOrder);
    }

    callAPIAsyncGetPrice = async (dishId, idString) => {
        //console.log((await (await fetch(`http://localhost:3000/dish_list/price?dish_id=${dishId}${idString}`)).json()));
        const promise = fetch(`http://localhost:3000/dish_list/price?dish_id=${dishId}${idString}`);
        const response = await promise;
        const result = await response.json();
        return result.price;
    }

    returnPrice = async (MyListOfOrders) => {
        if (MyListOfOrders[0][0][0] == "" && MyListOfOrders.length == 1){
            // console.log("MyListOfOrders is empty");
            return 0.00;
        }
        var totalPrice = 0;
        var timesRun = 0;
        console.log("LENGTH: " + MyListOfOrders.length);
        for (var i = 0; i < MyListOfOrders.length; i++){
            console.log("RUNNING");
            var dishtype = MyListOfOrders[i][0][0];
            var dish_id = 0;
            if(dishtype == "bowl"){
                dish_id = 1;
            }
            else if(dishtype == "plate"){
                dish_id = 2;
            }
            else if(dishtype == "bigger plate"){
                dish_id = 3;
            }
            else{ //it must be empty, add 0 and don't calculate further
                totalPrice+=0;
                continue;
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
            if (timesRun == 0) {
                totalPrice = totalPrice + await this.callAPIAsyncGetPrice(dish_id, "");
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
                totalPrice = totalPrice + await this.callAPIAsyncGetPrice(dish_id, resultString);
                console.log("New total price: " + totalPrice);
            }
    
        }
        return totalPrice.toFixed(2);
    }

    async updatePrice(order) {
        const newPrice = await this.returnPrice(order);
        this.setState((prevState) => {
            return ({
                ...prevState,
                price: newPrice
            })
        });

    }

    updateOrder(order) {
        //Alex code for persistance
        localStorage.setItem("CurrentOrder", JSON.stringify(order));
        //--------Nathan Working Code
        console.log("trying to update w" + order);
        this.setState((prevState) => {
            return ({
                ...prevState,
                currentOrder: order,
                price: "..."
            })
        });
        this.updatePrice(order);
    }

    updateScreen(screen) {
        this.setState((prevState) => {
            return ({
                ...prevState,
                screen
            })
        });
    }

    createContainer(containerType) {
            var orderArray = [];
            var dishArray = [containerType];
            var entreeArray = [];
            var sidesArray = [];
            var appetizers = [];
            orderArray.push(dishArray, entreeArray, sidesArray, appetizers);
            let mylistoforders = this.state.currentOrder;
            mylistoforders.push(orderArray);
            this.updateOrder(mylistoforders);
            this.updateScreen("ordering");
    }

    addToCart = (itemToAdd, index) => {
        var mylistoforders = this.state.currentOrder;
      
        
        var thirdindex = mylistoforders[mylistoforders.length-1][index].length;
        
        mylistoforders[mylistoforders.length-1][index][thirdindex] = itemToAdd;
      
        this.updateOrder(mylistoforders);
      }

    homeView() {
        this.updateScreen("container");
    }

    checkoutView() {
        this.updateScreen("checkout");
    }

    render() {
        let mainView;
        if(this.state.screen === "container") 
            mainView = <CustomerMenu createContainer={(ct) => this.createContainer(ct)}  checkoutView={() => this.checkoutView()}/>;
        else if (this.state.screen === "ordering")
            mainView = <Container addToCart={(itemToAdd, itemType) => this.addToCart(itemToAdd, itemType)}  goBack={()=> this.homeView()}/>;
        else // checkout
            mainView = <CustomerCheckout homeView = {() => this.homeView()} price={this.state.price} order={this.state.currentOrder} updateOrderCallback={(order) => this.updateOrder(order)}/>;
        return (
            <div id="viewContainer">
                <CustomerDishChoiceCurrentOrder order={this.state.currentOrder} price={this.state.price} updateOrderCallback={(order) => this.updateOrder(order)}/>
                {mainView}
            </div>
        );
    }
}

export default CustomerViewContainer;
