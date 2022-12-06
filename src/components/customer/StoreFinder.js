import React from 'react';
import "./CustMainPage.css";
import PandaMap from "./PandaMap";


import Logo from '../../customer/pandaLogo.png';
import { useNavigate } from 'react-router-dom';
import "../../customer/container.css";
import { ChakraProvider, theme } from '@chakra-ui/react'


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

        <ChakraProvider className="PandaMap">

            <PandaMap />

        </ChakraProvider>



    </div>
  )

}

export default StoreFinder

