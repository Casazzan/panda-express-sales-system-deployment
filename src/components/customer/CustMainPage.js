import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustMainPage.css";

import CustomerViewBtn from "../CustomerViewBtn";

import Logo from './pandaLogo.png';


const CustMainPage = (props) => {

  let navigate = useNavigate();

  return (

    <div className="CustHeader">

      <img src={Logo} className="img" width="25%" />

      <div className="CustOptions">
      
      <div class = "CustomerViewBtn" id = "FindRestaraunt" onClick={() => {navigate("/CustomerMenu")}}><CustomerViewBtn Name = "Find Restaraunt"/></div>
      <div class = "CustomerViewBtn" id = "ViewMenu" onClick={() => {navigate("/CustomerMenu")}}><CustomerViewBtn Name = "View Menu"/></div>
      <div class = "CustomerViewBtn" id = "StartOrder"onClick={() => {navigate("/CustomerMenu")}}><CustomerViewBtn Name = "Start Order"/></div> 

      </div>

    </div>
  )

}

export default CustMainPage




