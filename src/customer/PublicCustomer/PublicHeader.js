import React from "react";
import Logo from '../pandaLogo.png';
import "../header.css";
import "../menuContainer.css";
import { useNavigate } from 'react-router-dom';
//import { useNavigate, Link } from 'react-router-dom';




const PublicHeader = (props) => {

  let navigate = useNavigate();

  return (
    <>
    <div className="header">

        <img src={Logo} className="img" width="25%" />
        
        <div className="options">
                <button className="addToCart" onClick={() => {navigate("/CustMainPage")}}> Back </button>
                <button className="optionBtn" onClick={() => props.callback("entrees")}> Entrees </button>
                <button className="optionBtn" onClick={() => props.callback("sides")}> Sides </button>
                <button className="optionBtn" onClick={() => props.callback("apps")}> Appetizers </button>
        </div>  

    </div>
    </>
  );
}

export default PublicHeader;