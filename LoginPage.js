import React, { Component } from "react";
import '../index2.css';
import HomePageNavButton from './HomePageNavButton';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    let navigate = useNavigate();
    return (
      <div class = "HomePageScreen">
          <div class = "homeLogo"></div>
          <div class = "HomePageButton" id = "Login" onClick={() => {navigate("/View")}}><HomePageNavButton Name = "Login" /></div>
          <div class = "HomePageButton" id = "Public" onClick={() => {navigate("/CustMainPage")}}><HomePageNavButton Name = "Public View" /></div>
      </div>
      )
  }
  
  export default HomePage