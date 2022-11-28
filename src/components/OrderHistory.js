import { useState } from "react";
import "../App.css";
import Summary from './OrderHistoryDisplay'

function OrderHistory() {
  const [orderHistorySummary, setOrderHistorySummary] = useState('0');

  const querySummary = async() => {
    const promise = fetch(`http://localhost:3000/order_history/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setOrderHistorySummary(result);
  };

  return (
    <div>
      <h2>Current Inventory</h2>
      <button className="SubmitCritical" onClick={() => querySummary()}> View Order History</button>
    <Summary orderList={orderHistorySummary}/>
    </div>
  );
}

export default OrderHistory;
