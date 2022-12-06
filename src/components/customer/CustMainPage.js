/*
 * @param {Array} orders - The React component holding the user's current order.
 * @param {double} price - React component for the current price.
 * @param {Function} updateOrderCallback - Recat function called when the user selects something and an current order screen needs to be updated.
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustMainPage.css";

import CustomerViewBtn from "../CustomerViewBtn";

import Logo from './pandaLogo.png';
import Text from 'react-text';
import FoodBackground from './pandaFood.jpeg';

/**
 * Main page for the screen the Public can access
 * @constructor
 * @param {Component} props - React props passed in, contains a 3 dimensional array holding current order, a double holding the current price, and a function to update the current order so the display is correct when the user selects an item.
 */
const CustMainPage = (props) => {

  let navigate = useNavigate();

  return (

    <div className="CustMainPage">

      <div className="header">

        <img src={Logo} className="img" width="25%" />

        <div className="options">
                <button className="addToCart" onClick={() => {navigate("/")}}> Back </button>
        </div>  

        <div className="CustOptions">
      
          <div class = "CustomerViewBtn" id = "FindRestaraunt" onClick={() => {navigate("/CustMainPage/StoreFinder")}}> <CustomerViewBtn Name = "Find Restaraunt"/></div>
          <div class = "CustomerViewBtn" id = "ViewMenu" onClick={() => {navigate("/CustMainPage/PublicMenu")}}> <CustomerViewBtn Name = "View Menu"/></div>

        </div>

      </div>

      <div className = "background">

         <img className = "backgroundImg" src={FoodBackground} />
         <h1 className = "backgroundText">Welcome to Panda Express! </h1> <br/> <br/> 
         <p className = "backgroundText2">
         We are a fast food restaurant chain that serves American Chinese cuisine. You can view our menu here on our site. Then, 
         once you're ready to head to a store to place an order, click on "Find Restaraunt" to get directions to one of our 2,000 locations.
         Hope to see you soon!</p>

      </div>

    </div>
  )

}

export default CustMainPage




