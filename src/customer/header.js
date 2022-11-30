import React from "react";
import Logo from './pandaLogo.png';
import "./header.css";
import "./menuContainer.css";
//import { useNavigate, Link } from 'react-router-dom';



function header(props) {

  return (
    <>
    <div className="header">

        <img src={Logo} className="img" width="25%" />
        
        <div className="options">
                <button className="addToCart" onClick={() => props.goBack()}>Back</button>;
                <button className="optionBtn" onClick={() => props.callback("entrees")}> Entrees </button>
                <button className="optionBtn" onClick={() => props.callback("sides")}> Sides </button>
                <button className="optionBtn" onClick={() => props.callback("apps")}> Appetizers </button>
        </div>  

    </div>
    </>
  );
}

export default header;