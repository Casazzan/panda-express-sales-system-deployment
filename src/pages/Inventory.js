import React, {useState}from "react";
import InventoryTabs from "../components/InventoryTabs";
import {Component} from 'react';
import Sidebar from '../components/Sidebar'

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  getSummary = () => {
      fetch("http://localhost:3000/inventory/summary")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
  }
  getItemPrice = () => {
      fetch("http://localhost:3000/inventory/summary")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
  }
  render() {
    return (
      <div>
        <Sidebar />
        <div className="Right">
        <InventoryTabs />
        <p className="App-intro">{this.state.apiResponse}</p>
            <button onClick={this.getSummary}>Get Current Inventory</button>
        </div>
      </div>
    )
  }
}

export default Inventory; 

