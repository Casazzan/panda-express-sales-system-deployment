import { useState } from "react";
import "../App.css";
import Critical from './CriticalItemsDisplay'
import Summary from './InventoryDisplay'

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

  const queryCrit = async() => {
    const promise = fetch(`http://localhost:5003/report/restock`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setCriticalResponse(result);
  };

  const queryInventory = async() => {
    const promise = fetch(`http://localhost:5003/inventory/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setInventorySummary(result);
  };

  // reset values to 0
  // setname ... 0
  const addItem = async() => {
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

          <button className="SubmitCritical" onClick={() => queryInventory()}> View Inventory</button>
          <Critical inventoryList={inventorySummary}/>
          <p></p>
          <button className="SubmitCritical" onClick={() => queryCrit()}> View Critical Items</button>
          <Critical itemList={criticalItems}/>
          <p></p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Add Inventory Item</h2>
          <hr />
          <p></p>
          <form>
            <label> Enter Name </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button className="SubmitButton">Add Item</button>
            <p>
              {name}
              {price}
              {type}
              {initial}
              {restock}
            </p>

          </form>
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
          <form>
            <label>Select Item to Change: </label>
            <select
              value={type}
              onChange={(e) => setUpdateItemName(e.target.value)}
            >
              <option value="sweetfire_chicken_breast">sweetfire_chicken_breast</option>
              <option value="kung_pao_chicken">kung_pao_chicken</option>
              <option value="black_pepper_chicken">black_pepper_chicken</option>
              <option value="grilled_teriyaki_chicken">grilled_teriyaki_chicken</option>
              <option value="broccoli_beef">broccoli_beef</option>
              <option value="bejing_beef">bejing_beef</option>
              <option value="honey_walnut_shrimp">honey_walnut_shrimp</option>
              <option value="mushroom_chicken">mushroom_chicken</option>
              <option value="eggplant_tofu">eggplant_tofu</option>
              <option value="mixed_vegetables">mixed_vegetables</option>
              <option value="chow_mein">chow_mein</option>
              <option value="fried_rice">fried_rice</option>
              <option value="brown_steamed_rice">brown_steamed_rice</option>
              <option value="crispy_shrimp">crispy_shrimp</option>
              <option value="string_bean_chicken_breast">string_bean_chicken_breast</option>
            </select> 
            <p></p>
            <label>Input New Amount: </label>
            <input
              type="number"
              required
              value={updateItemAmount}
              onChange={(e) => setUpdateItemAmount(e.target.value)}
            />
            <p></p>
            <button className="SubmitCritical">Submit</button>
          </form>
        {updateItemName}
        {updateItemAmount}
        </div>
      </div>
    </div>
  );
}

export default InventoryTabs;
