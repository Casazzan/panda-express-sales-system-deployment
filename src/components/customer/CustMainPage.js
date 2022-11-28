import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustMainPage.css";

import CustomerViewBtn from "../CustomerViewBtn";

import Logo from './pandaLogo.png';
import Text from 'react-text';


const CustMainPage = (props) => {

  let navigate = useNavigate();

  return (

    <div className="CustMainPage">

      <div className="CustHeader">

        <img src={Logo} className="img" width="25%" />

        <div className="CustOptions">
      
          <div class = "CustomerViewBtn" id = "FindRestaraunt" onClick={() => {navigate("/CustMainPage/PublicMenu")}}> <CustomerViewBtn Name = "Find Restaraunt"/></div>
          <div class = "CustomerViewBtn" id = "ViewMenu" onClick={() => {navigate("/CustMainPage/PublicMenu")}}> <CustomerViewBtn Name = "View Menu"/></div>

        </div>

      </div>

      <Text> Welcome to Panda Express! </Text>


    </div>
  )

}

export default CustMainPage




