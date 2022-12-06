import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerDishChoiceButton from "../CustomerDishChoiceButton";
import CustomerDishChoiceCurrentOrder from "./CustomerDishChoiceCurrentOrder";
import '../../index.css';

  /**
   * Landing page for the Customer Kiosk Display
   * @constructor
   * @param {Component} props - React props passed in, contains a 3 dimensional array holding current order, a double holding the current price, and a function to update the current order so the display is correct when the user selects an item.
   */
const CustomerMenu = (props) => {

  return (
    <div class = "CustomerMenuGrid">

      <div class = "CustomerMenuDishChoiceButton" id = "Bowl" onClick={() => props.createContainer("bowl")} ><CustomerDishChoiceButton Name = "Bowl"/></div>
      <div class = "CustomerMenuDishChoiceButton" id = "Plate" onClick={() => props.createContainer("plate")}><CustomerDishChoiceButton Name = "Plate"/></div>
      <div class = "CustomerMenuDishChoiceButton" id = "BiggerPlate" onClick={() => props.createContainer("bigger plate")}><CustomerDishChoiceButton Name = "Bigger Plate"/></div>
      {/* <div class = "CustomerMenuDishChoiceButton" id = "IndividualItems"><CustomerDishChoiceButton Name = "Indiv. Items"/></div> */}
      <div class = "CustomerMenuDishChoiceButton" id = "CheckoutScreen" onClick={() => props.checkoutView()}><CustomerDishChoiceButton Name = "Checkout"/></div>
        
        
    </div>
  )
}

export default CustomerMenu
