import React from "react";

function itemBox({ itemImg, itemName, itemTitle, itemType, addToCart }) {

  return (
    <div className="details">
      <img src={itemImg} alt="" className="imgDetails" />
      <div className="foodName">
        <h2>{itemTitle}</h2>
      </div>

      <div className="selectBtn">
        <button onClick={()=>addToCart(itemName, itemType)} className="btn">Select</button>
      </div>
    
    </div>
  );
}


export default itemBox;
