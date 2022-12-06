import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import CustomerCheckout from './CustomerCheckout';
import CustomerMenu from './CustomerMenu';

import Container from '../customer/container';
import Entree from "../customer/entreeOption";
import Side from "../customer/sideOption";
import Apps from "../customer/appOption";

// var callAPIAsync = async () => {
//   return (await fetch("http://localhost:5001/roster?id=2")).text();
// }
const CustomerLandingPage = () => {
  // var hello = callAPIAsync();
  // console.log("BRUH" + hello);
  return (
    <Router>
        <Routes>
            <Route path = "/" element = {<CustomerMenu />}></Route> {/*<---change this to the homescreen*/}
            <Route path = "/CustomerMenu" element = {<CustomerMenu />}></Route>
            <Route path = "/CustomerMenu/Checkout" element = {<CustomerCheckout />}></Route>
            <Route path=  "/CustomerMenu/entrees" element={<Entree />} />
            <Route path=  "/CustomerMenu/sides" element={<Side />} />
            <Route path=  "/CustomerMenu/apps" element={<Apps />} />
            <Route path=  "/CustomerMenu/ordering" element={<Container />} />
        </Routes>
    </Router>
  )
}

export default CustomerLandingPage