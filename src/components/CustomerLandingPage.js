import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import CustomerCheckout from './CustomerCheckout';
import CustomerMenu from './CustomerMenu';

import Container from '../customer/container';
import Entree from "../customer/entreeOption";
import Side from "../customer/sideOption";
import Apps from "../customer/appOption";

/**
 * A Test for using Routeing in the customer page, no longer in use
 */
const CustomerLandingPage = () => {
  return (
    <Router>
        <Routes>
            <Route path = "/Home" element = {<CustomerMenu />}></Route> {/*<---change this to the homescreen*/}

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
