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
      fetch("http://localhost:5000/roster?id=2")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
  }

  render() {  
    return (  
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/employee" element={<Employee/>}/>
          <Route path="/accessibility" element={<Accessibility/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      <div className="Footer">
      Footer
      </div>
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
//       fetch("http://localhost:5000/roster?id=2")
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
