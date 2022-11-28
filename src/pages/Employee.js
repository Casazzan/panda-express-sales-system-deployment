import React, {useState} from "react";
import EmployeeTabs from "../components/EmployeeTabs";
import {Component} from 'react';
import Sidebar from '../components/Sidebar'

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  getSummary = () => {
      fetch("http://localhost:3000/roster?id=2")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
  }
  render() {
    return (
      <div>
        <Sidebar />
        <div className="Right">
        <EmployeeTabs />
        <p className="App-intro">{this.state.apiResponse}</p>
            <button onClick={this.getSummary}>Get Employee 2</button>
        </div>
        <div className="Footer">
        Footer
        </div>
      </div>
    )
  }
}

export default Employee; 

