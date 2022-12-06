import { useState, useEffect } from "react";
import "../App.css";
import Summary from './OrderHistoryDisplay'

function OrderHistory() {
  const [orderHistorySummary, setOrderHistorySummary] = useState('0');

  useEffect(() => {
    let ignore = false;

    if (!ignore)  querySummary()
    return () => { ignore = true; }
    },[]);

  const querySummary = async() => {
    const promise = fetch(`http://localhost:5001/order_history/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setOrderHistorySummary(result);
  };

  return (
    <div>
      <h2>Current Inventory</h2>
    <Summary orderList={orderHistorySummary}/>
    </div>
  );
}

export default OrderHistory;
