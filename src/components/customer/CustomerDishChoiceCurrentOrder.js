import '../../index.css';
import React from "react";
import {useState, useEffect} from 'react'
import axios from 'axios'

var databaseName = ['honey_seasame_chicken','orange_chicken','black_pepper_angus_steak','string_bean_chicken_breast','sweetfire_chicken_breast','kung_pao_chicken','black_pepper_chicken','grilled_teriyaki_chicken','broccoli_beef','bejing_beef','honey_walnut_shrimp','mushroom_chicken','eggplant_tofu','mixed_vegetables','chow_mein','fried_rice','white_steamed_rice','brown_steamed_rice','chicken_egg_roll','crispy_shrimp'];
var displayName = ['Honey Seasame Chicken', 'Orange Chicken', 'Black Pepper Angus Steak', 'String Bean Chicken Breast', 'Sweetfire Chicken Breast', 'Kung Pao Chicken', 'Black Pepper Chicken', 'Grilled Teriyaki Chicken', 'Broccoli Beef', 'Bejing Beef', 'Honey Walnut Shrimp','Mushroom Chicken', 'Eggplant Tofu', 'Mixed Vegetables', 'Chow Mein', 'Fried Rice', 'White Steamed Rice', 'Brown Steamed Rice', 'Chicken Egg Roll', 'Crispy Shrimp'];
  /**
   * The screen that displays the user's current order.
   * @constructor
   * @param {Component} props - React props passed in, contains a 3 dimensional array holding current order, a double holding the current price, and a function to update the current order so the display is correct when the user selects an item.
   */
  const CustomerDishChoiceCurrentOrder = (props) => {
    console.log(props);
    /**
     * Handles when a user deletes an item, if it is the whole entree it deletes the entire item, if not it deletes the singular item.
     * @param {int} index - Position in the first array of the order.
     * @param {int} subIndex - Position in the second array of the order.
     * @param {int} subsubIndex - Position in the third array of the order.
     */
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
    /**
     * Displays the name of an item on the current order, if it is a seasonal item it gers the name from the database.
     * @param {String} orderName - database name of the order.
     */
     const [translatedName, setTranslatedName] = useState('Default');
     const changeLanguage = (input) => {
       // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
       if (JSON.parse(localStorage.getItem("language")) != "en") {
         const encodedParams = new URLSearchParams();
         encodedParams.append("q", input);
         encodedParams.append("target", JSON.parse(localStorage.getItem("language")));
         encodedParams.append("source", "en");
     
         const options = {
           method: 'POST',
           url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
           headers: {
             'content-type': 'application/x-www-form-urlencoded',
             'Accept-Encoding': 'application/gzip',
             'X-RapidAPI-Key': '8fbc873fd8msh5d43e6022f22f64p15f17ejsnbb456384ba17',
             'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
           },
           data: encodedParams
         };
     
         axios.request(options).then(function (response) {
             setTranslatedName(response.data.data.translations[0].translatedText);
         }).catch(function (error) {
             console.error(error);
         });
       }
       else {
         setTranslatedName(input)
       }
     }
    const displayTheName = (orderName) => {
      if(databaseName.includes(orderName)){
        changeLanguage(displayName[databaseName.indexOf(orderName)])
        return translatedName
      }
      else{
        changeLanguage(orderName);
        return(translatedName);
      }
    }
    return (
      <div className = "CustomerMenuCurrentOrder">
        {props.order.map((items, index) => {
          return (
            <div>
              {items.map((subItems, subIndex) => {
                return(
                  <div>
                    {subItems.map((subsubItems, subsubIndex) => {
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
                          <span onClick={() => {handlechange(index,subIndex,subsubIndex);}}><li class = "listItemInCurrentOrder">{displayTheName(subsubItems)}</li></span>
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