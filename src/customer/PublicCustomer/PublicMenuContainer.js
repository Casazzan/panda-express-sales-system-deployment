import React from "react";
import PublicItemBox from "../PublicItemBox";

// entree images
import hsChicken from '../hsChicken.png';
import oChicken from '../oChicken.png';
import bpaSteak from '../bpaSteak.png';
import sbChicken from '../sbChicken.png';
import sfChicken from '../sfChicken.png';
import bpChicken from '../bpChicken.png';
import gtChicken from '../gtChicken.png';
import beijBeef from '../beijBeef.png';
import hwShrimp from '../hwShrimp.png';
import mChicken from '../mChicken.png';
import epTofu from '../epTofu.png';
import AddSeasonal from "./PublicAddSeasonal";




import {useState, useEffect} from 'react'
import axios from 'axios'
  
const PublicMenuContainer = (props) => {
  
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
              console.log("sent query")
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
            console.log("Test", translations)
          }, [setTranslations]);
      

  return (
    <>
      <div className="menuContainer">
        <div className="menuItems">
              <main>

                <PublicItemBox itemImg = {hsChicken} className = "img" itemTitle = {translations[0].translatedText} />
                <PublicItemBox itemImg = {oChicken} className = "img" itemTitle = {translations[1].translatedText} />
                <PublicItemBox itemImg = {bpaSteak} className = "img" itemTitle = {translations[2].translatedText} />
                <PublicItemBox itemImg = {sbChicken} className = "img" itemTitle = {translations[3].translatedText} />
                <PublicItemBox itemImg = {sfChicken} className = "img" itemTitle = {translations[4].translatedText} />
                <PublicItemBox itemImg = {bpChicken} className = "img" itemTitle = {translations[5].translatedText} />
                <PublicItemBox itemImg = {gtChicken} className = "img" itemTitle = {translations[6].translatedText} />
                <PublicItemBox itemImg = {beijBeef} className = "img" itemTitle = {translations[7].translatedText} />
                <PublicItemBox itemImg = {hwShrimp} className = "img" itemTitle = {translations[8].translatedText} />
                <PublicItemBox itemImg = {mChicken} className = "img" itemTitle = {translations[9].translatedText} />
                <PublicItemBox itemImg = {epTofu} className = "img" itemTitle = {translations[10].translatedText} />   

                <AddSeasonal />

            </main>
        </div>
      </div>
    </>
  );
}

export default PublicMenuContainer;
