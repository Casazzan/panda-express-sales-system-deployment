import React from 'react'
import CustomerDishChoiceCurrentOrder from "./CustomerDishChoiceCurrentOrder";
import '../index.css';
import CustomerDishChoiceButton from './CustomerDishChoiceButton';
import { useNavigate } from 'react-router-dom';
import CustomerTotalPrice from './CustomerTotalPrice';
import CustomerCheckoutButton from './CustomerCheckoutButton';


const CustomerCheckout = () => {
  
  let navigate = useNavigate();
  return (
    <div class = "CheckoutScreen">
        <div class = "CustomerCheckoutOrder"><CustomerDishChoiceCurrentOrder /></div>
        <div id = "Checkout"><CustomerCheckoutButton /></div>
        <div class = "CustomerCheckoutButton" id = "GoBack" onClick={() => {navigate("/CustomerMenu")}}><CustomerDishChoiceButton Name = "Go Back" /></div>
        <div id = "Price"><CustomerTotalPrice /></div>
    </div>
    )
    
}

export default CustomerCheckout
