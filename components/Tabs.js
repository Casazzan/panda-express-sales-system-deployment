import { useState } from "react";
import "../App.css";
import {Form} from './Form'

// https://www.w3schools.com/html/html_tables.asp
// table 

function Tabs() {
  const [toggleState, setToggleState] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [initial, setInitial] = useState(0);
  const [restock, setRestock] = useState(0);
  const [critical, setCritical] = useState(0);
  const [type, setType] = useState('entree');


  const toggleTab = (index) => {
    setToggleState(index);
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
          <h2>Content 1</h2>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Add Inventory Item</h2>
          <hr />
          <form>
            <label> Enter Name </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label> Enter Price </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label> Enter Initial Amount </label>
            <input
              type="number"
              required
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
            />
            <label> Enter Default Number to Restock To </label>
            <input
              type="number"
              required
              value={restock}
              onChange={(e) => setRestock(e.target.value)}
            />
            <label> Enter Critical Inventory Threshold </label>
            <input
              type="number"
              required
              value={critical}
              onChange={(e) => setCritical(e.target.value)}
            />
            <label> Enter Type </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="side">side</option>
              <option value="entree">entree</option>
              <option value="appetizer">appetizer</option>
            </select> 
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
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
