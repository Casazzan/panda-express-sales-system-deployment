import { useState, useEffect } from "react";
import "../App.css";
import Critical from './CriticalItemsDisplay'
import Summary from './InventoryDisplay'
import InventorySelector from './InventorySelector'

// https://www.w3schools.com/html/html_tables.asp
// table 

function InventoryTabs() {
  const [toggleState, setToggleState] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [initial, setInitial] = useState(0);
  const [restock, setRestock] = useState(0);
  const [critical, setCritical] = useState(0);
  const [type, setType] = useState('entree');
  const [updateItemName, setUpdateItemName] = useState('Orange Chicken');
  const [updateItemAmount, setUpdateItemAmount] = useState('0');
  const [criticalItems, setCriticalResponse] = useState('0');
  const [inventorySummary, setInventorySummary] = useState('0');


  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore)  queryCrit()
    return () => { ignore = true; }
    },[]);
  
  useEffect(() => {
    let ignore = false;

    if (!ignore)  queryInventory()
    return () => { ignore = true; }
    },[]);

    const inputchangehandler = (event) => {
    setName(event.target.value);
    console.log(name);
    }


  const queryCrit = async() => {
    const promise = fetch(`http://localhost:5001/report/restock`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setCriticalResponse(result);
  };

  const updateServings = async() => {
    var selected = document.getElementById("selectedItemDiv").innerHTML;
    if (selected != "") {
      const promise = fetch(`http://localhost:5001/inventory/update_servings?id=${selected}&servings=${updateItemAmount}`); 
      const response = await promise;
      setUpdateItemAmount(0);
    }
  };

  const deleteItem = async() => {
    var selected = document.getElementById("selectedItemDiv").innerHTML;
    /*
    TODO fix after edited
    if (selected != "") {
      const promise = fetch(`http://localhost:5001/inventory/delete?id=${selected}`); 
      const response = await promise;
      setUpdateItemAmount(0);
    }
    */
  };

  const queryInventory = async() => {
    const promise = fetch(`http://localhost:5001/inventory/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setInventorySummary(result);
  };

  const restockInventory = async() => {
    const promise = fetch(`http://localhost:5001/inventory/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setInventorySummary(result);
  };

  // reset values to 0
  // setname ... 0
  const addItem = async() => {
    const firstPromise = fetch(`http://localhost:5001/inventory/nextID`); 
    const firstResponse = await firstPromise;
    const result = await firstResponse.json();
    var newID = result.nextID;
    console.log("inserting "+ name, newID, price, initial, restock, critical, type);
    const promise = fetch(`http://localhost:5001/inventory/add?id=${newID}&name=${name}&servings=${initial}&restock_quantity=${restock}&price=${price}&food_type=${type}&minimum_amount=${critical}`); 
    const response = await promise;
    setName("");
    setPrice(0);
    setInitial(0);
    setRestock(0);
    setType('entree');
    setCritical(0);
  };


  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
        View Inventory
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
        Add New Item
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
        Update Values
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Current Inventory</h2>

          <Summary inventoryList={inventorySummary}/>
          <p></p>
          <h2>Critical Items</h2>
          <Critical itemList={criticalItems}/>
          <p></p>
      </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Add Inventory Item</h2>
          <hr />
          <p></p>
            <label> Enter Name </label>
            <input type="text" name="name" 
                  onChange={inputchangehandler} 
                  value = {name}/>
            <p></p>
            <label> Enter Price </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p></p>
            <label> Enter Initial Amount </label>
            <input
              type="number"
              required
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
            />
            <p></p>
            <label> Enter Default Number to Restock To </label>
            <input
              type="number"
              required
              value={restock}
              onChange={(e) => setRestock(e.target.value)}
            />
            <p></p>
            <label> Enter Critical Inventory Threshold </label>
            <input
              type="number"
              required
              value={critical}
              onChange={(e) => setCritical(e.target.value)}
            />
            <p></p>
            <label> Enter Type </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="side">side</option>
              <option value="entree">entree</option>
              <option value="appetizer">appetizer</option>
            </select> 
            <p></p>
            <button 
              className="SubmitButton"
              onClick={() => addItem()}>
              Add Item
            </button>
            <p>
            </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Restock Options</h2>
            <p></p>
            <button className="SubmitCritical">Restock All</button>
            <p></p>
            <button className="SubmitCritical">Restock Critical</button>
            <p></p>
          <hr />
          <h2>Manually Update Inventory</h2>
            <label>Select Item to Change: </label>
            <InventorySelector 
              rosterList={inventorySummary}/>
            <p></p>
            <label>Input New Amount: </label>
            <input
              type="number"
              required
              value={updateItemAmount}
              onChange={(e) => setUpdateItemAmount(e.target.value)}
            />
            <p></p>
            <button 
              className="SubmitCritical"
              onClick={() => updateServings()}
              id="update"
              >Submit</button>
            <button 
              className="SubmitCritical"
              onClick={() => deleteItem()}
              id="delete"
              >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default InventoryTabs;
