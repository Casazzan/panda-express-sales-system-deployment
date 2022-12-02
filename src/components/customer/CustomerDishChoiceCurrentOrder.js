import '../../index.css';
import React from "react";

var databaseName = ['honey_seasame_chicken','orange_chicken','black_pepper_angus_steak','string_bean_chicken_breast','sweetfire_chicken_breast','kung_pao_chicken','black_pepper_chicken','grilled_teriyaki_chicken','broccoli_beef','bejing_beef','honey_walnut_shrimp','mushroom_chicken','eggplant_tofu','mixed_vegetables','chow_mein','fried_rice','white_steamed_rice','brown_steamed_rice','chicken_egg_roll','crispy_shrimp'];
var displayName = ['Honey Seasame Chicken', 'Orange Chicken', 'Black Pepper Angus Steak', 'String Bean Chicken Breast', 'Sweetfire Chicken Breast', 'Kung Pao Chicken', 'Black Pepper Chicken', 'Grilled Teriyaki Chicken', 'Broccoli Beef', 'Bejing Beef', 'Honey Walnut Shrimp','Mushroom Chicken', 'Eggplant Tofu', 'Mixed Vegetables', 'Chow Mein', 'Fried Rice', 'White Steamed Rice', 'Brown Steamed Rice', 'Chicken Egg Roll', 'Crispy Shrimp'];
  
  const CustomerDishChoiceCurrentOrder = (props) => {
    console.log(props);
    
    // localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    //if the orders don't exist
    // if (mylistoforders2 == null) {
    //   console.log("mylistoforders2 doesn't exist");
    //   localStorage.setItem('CurrentOrder', JSON.stringify(test));
    //   // localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    // }
    const handlechange = (index, subIndex, subsubIndex) => {
      const mynewlistoforders = props.order;
      //If if is a whole order, delete everything inside
      if (mynewlistoforders[index][subIndex][subsubIndex] === 'bowl' || mynewlistoforders[index][subIndex][subsubIndex] === 'plate' || mynewlistoforders[index][subIndex][subsubIndex] === 'bigger plate'){
        mynewlistoforders.splice(index, 1);
      }
      else{
        mynewlistoforders[index][subIndex].splice(subsubIndex, 1);
      }
      props.updateOrderCallback(mynewlistoforders);
    };

    return (
      <div className = "CustomerMenuCurrentOrder">
        {props.order.map((items, index) => {
          return (
            <div>
              {items.map((subItems, subIndex) => {
                return(
                  <div>
                    {subItems.map((subsubItems, subsubIndex) => {

                      //------------------------------------------
                      if (subItems == "bowl") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>Bowl</h3></span> )
                      } 
                      else if (subsubItems == "plate") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>Plate</h3></span> )
                      } 
                      else if (subsubItems == "bigger plate") {
                        return ( <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><h3>Bigger Plate</h3></span> )
                      }
                      else if (subsubItems == "") {
                        return ( <span></span> ) //return nothing
                      }
                      else {
                        return (
                          <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><li class = "listItemInCurrentOrder">{displayName[databaseName.indexOf(subsubItems)]}</li></span>
                        )
                      }
                      //--------------------------------------------
                    })}
                  </div>
                )
              })}
            </div>
          );
        })}

        <p>{`Price: ${props.price}`}</p>
      </div>
    );
}
  
  
  
  export default CustomerDishChoiceCurrentOrder