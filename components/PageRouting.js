import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import HomePage from './HomePage';

import ServerCheckout from './ServerCheckout';
import ServerMenu from './ServerMenu';
import Items from './Items';

import CustomerCheckout from './CustomerCheckout';
import CustomerMenu from './CustomerMenu';
import Container from '../customer/container';
import Entree from "../customer/entreeOption";
import Side from "../customer/sideOption";
import Apps from "../customer/appOption";

import Home from '../pages/Home';
import Sales from '../pages/Sales';
import Employee from '../pages/Employee';
import Inventory from '../pages/Inventory';
import Accessibility from '../pages/Accessability';
import ErrorPage from '../pages/ErrorPage';

const PageRouting = () => {
  return (
    <Router>
        <Routes>
            <Route path = "/" element = {<HomePage />}></Route>

            <Route path = "/ServerMenu" element = {<ServerMenu />}></Route>
            <Route path = "/ServerMenu/Checkout" element = {<ServerCheckout />}></Route>
            <Route path = "/ServerMenu/OrderSelect" element = {<Items />}></Route>

            <Route path= "/Manager" element={<Home/>}/>
            <Route path= "/Manager/sales" element={<Sales/>}/>
            <Route path= "/Manager/inventory" element={<Inventory/>}/>
            <Route path= "/Manager/employee" element={<Employee/>}/>
            <Route path= "/Manager/accessibility" element={<Accessibility/>}/>

            <Route path = "/CustomerMenu" element = {<CustomerMenu />}></Route>
            <Route path = "/CustomerMenu/Checkout" element = {<CustomerCheckout />}></Route>
            <Route path=  "/CustomerMenu/entrees" element={<Entree />} />
            <Route path=  "/CustomerMenu/sides" element={<Side />} />
            <Route path=  "/CustomerMenu/apps" element={<Apps />} />
            <Route path=  "/CustomerMenu/ordering" element={<Container />} />

            <Route path= "*" element={<ErrorPage/>}/>
        </Routes>
    </Router>
  )
}

export default PageRouting