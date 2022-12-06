import React from "react";
import {useState, useEffect} from 'react'
import axios from 'axios'

// entree images
import hsChicken from './hsChicken.png';
import oChicken from './oChicken.png';
import bpaSteak from './bpaSteak.png';
import sbChicken from './sbChicken.png';
import sfChicken from './sfChicken.png';
import bpChicken from './bpChicken.png';
import gtChicken from './gtChicken.png';
import beijBeef from './beijBeef.png';
import hwShrimp from './hwShrimp.png';
import mChicken from './mChicken.png';
import epTofu from './epTofu.png';

import ItemBox from "./itemBox";
import AddSeasonal from "./AddSeasonal";


const MenuContainer = (props) => {

    const [translations, setTranslations] = useState([
      { translatedText: "Honey Seasame Chicken" }, 
      { translatedText: "Orange Chicken" }, 
      { translatedText: "Black Pepper Angus Steak" }, 
      { translatedText: "String Bean Chicken Breast" }, 
      { translatedText: "Sweetfire Chicken Breast" }, 
      { translatedText: "Black Pepper Chicken" }, 
      { translatedText: "Grilled Teriyaki Chicken" }, 
      { translatedText: "Bejing Beef" }, 
      { translatedText: "Honey Walnut Shrimp" }, 
      { translatedText: "Mushroom Chicken" }, 
      { translatedText: "Eggplant Tofu" }, 
    ])

    const changeLanguage = () => {
      // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
      if (JSON.parse(localStorage.getItem("language")) != "en") {
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", "Honey Seasame Chicken");
        encodedParams.append("q", "Orange Chicken");
        encodedParams.append("q", "Black Pepper Angus Steak");
        encodedParams.append("q", "String Bean Chicken Breast");
        encodedParams.append("q", "Sweetfire Chicken Breast");
        encodedParams.append("q", "Black Pepper Chicken");
        encodedParams.append("q", "Grilled Teriyaki Chicken");
        encodedParams.append("q", "Bejing Beef");
        encodedParams.append("q", "Honey Walnut Shrimp");
        encodedParams.append("q", "Mushroom Chicken");
        encodedParams.append("q", "Eggplant Tofu");
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
            const translatedArray = response.data.data.translations
            // console.log("Within OrderHistory Display: ", response.data.data.translations)
            // console.log("Specific Element: ", translations[0].translatedText)
            setTranslations(translatedArray)
            // console.log("Test", translations)
            
        }).catch(function (error) {
            console.error(error);
        });
      }
      else {
        console.log("english")
      }
    }
  
    useEffect(() => {    
      changeLanguage()
    }, [setTranslations]);
  
    console.log(props.inventoryList);
    const items = []
    /*https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them
    */
    if (!props.inventoryList) {
      return (<div></div>);
    }
    items.push(
      <tr>
        <td> {translations[0].translatedText } </td>
        <td> {translations[1].translatedText } </td>
        <td> {translations[2].translatedText } </td>
        <td> {translations[3].translatedText } </td>
        <td> {translations[4].translatedText } </td>
        <td> {translations[5].translatedText } </td>
        <td> {translations[6].translatedText } </td>
        <td> {translations[7].translatedText } </td>
        <td> {translations[8].translatedText } </td>
        <td> {translations[9].translatedText } </td>
        <td> {translations[10].translatedText } </td>
      </tr>
    )

  return (
    <>
      <div className="menuContainer">
        <div className="menuItems">
              <main>

                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {hsChicken} className = "img" itemName = {"honey_seasame_chicken"} itemTitle = {"Honey Seasame Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {oChicken} className = "img" itemName = {"orange_chicken"} itemTitle = {"Orange Chicken"} itemType = {"1"}/>
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {bpaSteak} className = "img" itemName = {"black_pepper_angus_steak"} itemTitle = {"Black Pepper Angus Steak"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {sbChicken} className = "img" itemName = {"string_bean_chicken_breast"} itemTitle = {"String Bean Chicken Breast"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {sfChicken} className = "img" itemName = {"sweetfire_chicken_breast"} itemTitle = {"Sweetfire Chicken Breast"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {bpChicken} className = "img" itemName = {"black_pepper_chicken"} itemTitle = {"Black Pepper Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {gtChicken} className = "img" itemName = {"grilled_teriyaki_chicken"} itemTitle = {"Grilled Teriyaki Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {beijBeef} className = "img" itemName = {"bejing_beef"} itemTitle = {"Bejing Beef"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {hwShrimp} className = "img" itemName = {"honey_walnut_shrimp"} itemTitle = {"Honey Walnut Shrimp"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {mChicken} className = "img" itemName = {"mushroom_chicken"} itemTitle = {"Mushroom Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {epTofu} className = "img" itemName = {"eggplant_tofu"} itemTitle = {"Eggplant Tofu"} itemType = {"1"} />   
           
                <AddSeasonal addToCart = {(itemToAdd, index) => props.addToCart(itemToAdd, index)}/>
            

            </main>
        </div>


      </div>
    </>
  );
}

export default MenuContainer;
