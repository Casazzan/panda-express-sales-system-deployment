import React from 'react'
import { useNavigate } from 'react-router-dom';
import ServerDishChoiceButton from "./ServerDishChoiceButton";
import ServerDishChoiceCurrentOrder from "./ServerDishChoiceCurrentOrder";
import '../index2.css';


const ServerMenu = () => {
  let navigate = useNavigate();

  const createBowl = () => {
    var orderArray = [];
    
    var dishArray = ["bowl"];
    var entreeArray = [];
    var sidesArray = [];
    var appetizers = [];
    orderArray.push(dishArray, entreeArray, sidesArray, appetizers);
    var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
    mylistoforders.push(orderArray);
    localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    navigate("/ServerMenu/OrderSelect")
  }

  const createPlate = () => {
    var orderArray = [];
    
    var dishArray = ["plate"];
    var entreeArray = [];
    var sidesArray = [];
    var appetizers = [];
    orderArray.push(dishArray, entreeArray, sidesArray, appetizers);
    var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
    mylistoforders.push(orderArray);
    localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    navigate("/ServerMenu/OrderSelect")
  }
  const createBiggerPlate = () => {
    var orderArray = [];
    
    var dishArray = ["bigger plate"];
    var entreeArray = [];
    var sidesArray = [];
    var appetizers = [];
    orderArray.push(dishArray, entreeArray, sidesArray, appetizers);
    var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
    mylistoforders.push(orderArray);
    localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    navigate("/ServerMenu/OrderSelect")
  }

  return (

    <div class = "ServerMenuGrid">
        <div class = "ServerMenuDishChoiceButton" id = "BowlScreen" onClick={() => {createBowl()}}><ServerDishChoiceButton Name = "Bowl"/></div>
        <div class = "ServerMenuDishChoiceButton" id = "PlateScreen" onClick={() => {createPlate()}}><ServerDishChoiceButton Name = "Plate"/></div>
        <div class = "ServerMenuDishChoiceButton" id = "BiggerPlateScreen" onClick={() => {createBiggerPlate()}}><ServerDishChoiceButton Name = "Bigger Plate"/></div>
        <div class = "CheckoutButton" id = "ServerCheckoutScreen" onClick={() => {navigate("/ServerMenu/Checkout")}}><ServerDishChoiceButton Name = "Checkout"/></div>
        <div class = "ServerMenuCurrentOrder">
            <ServerDishChoiceCurrentOrder />
        </div>
    </div>
    
  )
}

export default ServerMenu
