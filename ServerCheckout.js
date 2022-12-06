import React from 'react'
import ServerDishChoiceCurrentOrder from "./ServerDishChoiceCurrentOrder";
import '../index2.css';
import ServerDishChoiceButton from './ServerDishChoiceButton';
import { useNavigate } from 'react-router-dom';
import TotalPrice from './TotalPrice';
import ServerCheckoutButton from './ServerCheckoutButton';
import PandaLogo from './panda-logo.png';


const ServerCheckout = () => {

  let navigate = useNavigate();
  return (
    <div class = "CheckoutScreen">
        <img class = "GoHome" id = "gohomeCheckout" src={PandaLogo} onClick={() => {navigate("/View")}}/>
        <div class = "ServerCheckoutOrder"><ServerDishChoiceCurrentOrder /></div>
        <div id = "ServerCheckout"><ServerCheckoutButton /></div>
        <div class = "ServerCheckoutButton" id = "ServerGoBack" onClick={() => {navigate("/ServerMenu")}}><ServerDishChoiceButton Name = "Go Back" /></div>
        <div id = "ServerPrice"><TotalPrice /></div>
    </div>
    )
}

export default ServerCheckout
