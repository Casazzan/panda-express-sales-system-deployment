import React from "react";

function PublicItemBox({ itemImg, itemTitle}) {

  return (
    <div className="details">
      <img src={itemImg} alt="" className="imgDetails" />
      <div className="foodName">
        <h2>{itemTitle}</h2>
      </div>

    
    </div>
  );
}

export default PublicItemBox;
