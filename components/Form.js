import React from "react";
import "../App.css";

function Form() {
  return(
    <div className="form">
      <h2> Add Inventory Item </h2>
      <form>
        <label> Enter Name </label>
        <input
          type="text"
          required
        />
        <label> Enter Price </label>
        <input
          type="number"
          required
        />
        <label> Enter Type </label>
        <select>
          <option value="side">Side</option>
          <option value="entree">Entree</option>
          <option value="appetizer">Appetizer</option>
        </select> 
        <button>Add Item</button>
      </form>
    </div>
  );
}

export default Form;
