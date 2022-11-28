import React from "react";

var test = [[[""]]];

// var mylistoforders2 = JSON.parse(localStorage.getItem('CurrentOrder'));
    
//     //if the orders don't exist
//     if (mylistoforders2 == null) {
//       console.log("mylistoforders2 doesn't exist");
//       localStorage.setItem('CurrentOrder', JSON.stringify(test));
//       // localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
//     }



const addToCart = (itemToAdd, index) => {
    var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));
  
    
    var thirdindex = mylistoforders[mylistoforders.length-1][index].length;
    
    
  mylistoforders[mylistoforders.length-1][index][thirdindex] = itemToAdd;
  
    localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
}

export default itemBox;