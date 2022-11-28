import React, { Component } from "react";
import '../index2.css';
import HomePageNavButton from './HomePageNavButton';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    let navigate = useNavigate();
    return (
      <div class = "HomePageScreen">
          <div class = "homeLogo"></div>
          <div class = "HomePageButton" id = "Customer" onClick={() => {navigate("/CustomerMenu")}}><HomePageNavButton Name = "Customer View" /></div>
          <div class = "HomePageButton" id = "Server" onClick={() => {navigate("/ServerMenu")}}><HomePageNavButton Name = "Server View" /></div>
          <div class = "HomePageButton" id = "Manager" onClick={() => {navigate("/Manager")}}><HomePageNavButton Name = "Manager View" /></div>
          <div class = "HomePageButton" id = "Public" onClick={() => {navigate("/CustMainPage")}}><HomePageNavButton Name = "Public View" /></div>
      </div>
      )
  }
  
  export default HomePage