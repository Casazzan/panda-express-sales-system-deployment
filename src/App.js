//rafce
import React, { Component } from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Sales from './pages/Sales';
import Employee from './pages/Employee';
import Inventory from './pages/Inventory';
import Accessibility from './pages/Accessability';
import ErrorPage from './pages/ErrorPage';

import CustomerMenu from "./components/CustomerMenu";
import CustomerLandingPage from "./components/CustomerLandingPage";
import Container from './customer/container';
import Entree from "./customer/entreeOption";
import Side from "./customer/sideOption";
import Apps from "./customer/appOption";
import CustomerCheckout from './components/CustomerCheckout';

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

  // callAPI = () => {
  //     fetch("http://localhost:3000/roster?id=2")
  //     .then(updateUI(res.item_id));
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
  // }

  // takes whatever is returned by the previous statement as input
  // .then(function whatever(res) {
  //   console.log(res);
  // })

  // onClick={() => console.log()}


  callAPIAsync = async () => {
    // console.log((await fetch("http://localhost:3000/roster?id=2")).text());
    return (await fetch("http://localhost:3000/roster?id=2")).text();
  }

  render() {  
    return (  
      <Router>
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/employee" element={<Employee/>}/>
          <Route path="/accessibility" element={<Accessibility/>}/>
          <Route path="*" element={<ErrorPage/>}/>
          <Route path = "/CustomerMenu" element = {<CustomerMenu />}></Route>
            <Route path = "/CustomerMenu/Checkout" element = {<CustomerCheckout />}></Route>
            <Route path=  "/CustomerMenu/entrees" element={<Entree />} />
            <Route path=  "/CustomerMenu/sides" element={<Side />} />
            <Route path=  "/CustomerMenu/apps" element={<Apps />} />
            <Route path=  "/CustomerMenu/ordering" element={<Container />} />
        </Routes>
      {/* <div className="Footer"> */}
      {/* Footer */}
      {/* </div> */}
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
