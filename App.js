//rafce
import React, { Component } from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

//import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Sales from './pages/Sales';
import Employee from './pages/Employee';
import Inventory from './pages/Inventory';
import Accessibility from './pages/Accessability';
import ErrorPage from './pages/ErrorPage';

import HomePage from './components/HomePage';

import ServerCheckout from './components/ServerCheckout';
import ServerMenu from './components/ServerMenu';
import Items from './components/Items';

import CustMainPage from './components/CustMainPage';

import CustomerCheckout from './components/CustomerCheckout';
import CustomerMenu from './components/CustomerMenu';
import Container from './customer/container';
import Entree from "./customer/entreeOption";
import Side from "./customer/sideOption";
import Apps from "./customer/appOption";

/*
        // something so i can push again
        // another change to try to merge
        <header className="App-header">
          Panda Express Manager Page
          <p className="App-intro">{this.state.apiResponse}</p>
          <button onClick={this.callAPI}>Make Call</button>
        </header>
*/
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI = () => {
      fetch("http://localhost:3000/roster?id=2")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
  }

  render() {  
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

          <Route path = "/CustMainPage" element = {<CustMainPage />}></Route>

          <Route path = "/CustomerMenu" element = {<CustomerMenu />}></Route>
          <Route path = "/CustomerMenu/Checkout" element = {<CustomerCheckout />}></Route>
          <Route path=  "/CustomerMenu/entrees" element={<Entree />} />
          <Route path=  "/CustomerMenu/sides" element={<Side />} />
          <Route path=  "/CustomerMenu/apps" element={<Apps />} />
          <Route path=  "/CustomerMenu/ordering" element={<Container />} />

          <Route path= "*" element={<ErrorPage/>}/>
        </Routes>
      
      </Router>
    );
  }
}

export default App;

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: "t" };
//   }

//   callAPI = () => {
//       fetch("http://localhost:3000/roster?id=2")
//           .then(res => res.text())
//           .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
//   }

//   render() {  
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//           <p className="App-intro">{this.state.apiResponse}</p>
//           <button onClick={this.callAPI}>Make Call</button>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
