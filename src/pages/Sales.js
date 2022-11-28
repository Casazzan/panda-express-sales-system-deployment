import React, {useState}from "react";
import {Component} from 'react';
import OrderHistory from '../components/OrderHistory';
import Sidebar from '../components/Sidebar'

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="Right">
        <OrderHistory />
        </div>
      </div>
    )
  }
}

export default Sales;

