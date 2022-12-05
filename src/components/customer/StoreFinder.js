import React from 'react';

import Logo from '../../customer/pandaLogo.png';
import Text from 'react-text';
import { useNavigate } from 'react-router-dom';
import "../../customer/container.css";


const StoreFinder = (props) => {

    let navigate = useNavigate();
      

  return (

    <div className="StoreFinder">

        <div className="header">

            <img src={Logo} className="img" width="25%" />

            <div className="options">
                <button className="addToCart" onClick={() => {navigate("/CustMainPage")}}> Back </button>
            </div>  

        </div>

        <div className="container">

            <Text> Coming Soon! </Text>

        </div>

    </div>
  )

}

export default StoreFinder
