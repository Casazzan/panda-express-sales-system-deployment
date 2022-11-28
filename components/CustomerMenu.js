import React from 'react'
import { useNavigate } from 'react-router-dom';
import CustomerDishChoiceButton from "./CustomerDishChoiceButton";
import CustomerDishChoiceCurrentOrder from "./CustomerDishChoiceCurrentOrder";
import '../index.css';


const CustomerMenu = () => {
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
    navigate("ordering")
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
    navigate("ordering")
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
    navigate("ordering")
  }

  return (
    <div class = "CustomerMenuGrid">
      <div class = "CustomerMenuCurrentOrder">
            <CustomerDishChoiceCurrentOrder />
      </div>

      <div class = "CustomerMenuDishChoiceButton" id = "Bowl" onClick={() => {createBowl()}} ><CustomerDishChoiceButton Name = "Bowl"/></div>
      <div class = "CustomerMenuDishChoiceButton" id = "Plate" onClick={() => {createPlate()}}><CustomerDishChoiceButton Name = "Plate"/></div>
      <div class = "CustomerMenuDishChoiceButton" id = "BiggerPlate" onClick={() => {createBiggerPlate()}}><CustomerDishChoiceButton Name = "Bigger Plate"/></div>
      {/* <div class = "CustomerMenuDishChoiceButton" id = "IndividualItems"><CustomerDishChoiceButton Name = "Indiv. Items"/></div> */}
      <div class = "CustomerMenuDishChoiceButton" id = "CheckoutScreen" onClick={() => {navigate("Checkout")}}><CustomerDishChoiceButton Name = "Checkout"/></div>
        
        
    </div>
  )
}

export default CustomerMenu
