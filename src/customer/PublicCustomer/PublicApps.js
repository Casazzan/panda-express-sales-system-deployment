import React from "react";
import PublicItemBox from "../PublicItemBox";
import "../menuContainer.css";
import { Link } from "react-router-dom";
// item images
import ceRoll from '../ceRoll.png';
import cShrimp from '../cShrimp.png';

import AddSeasonal from "./PublicAddSeasonal";


import {useState, useEffect} from 'react'
import axios from 'axios'
      
const PublicApps = (props) => {
      
              const [translations, setTranslations] = useState([
                { translatedText: "chicken_egg_roll" }, 
                { translatedText: "crispy_shrimp" }, 
              ])
          
              const changeLanguage = () => {
                // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
                if (JSON.parse(localStorage.getItem("language")) != "en") {
                  console.log("sent query")
                  const encodedParams = new URLSearchParams();
                  encodedParams.append("q", "chicken_egg_roll");
                  encodedParams.append("q", "crispy_shrimp");
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
                        
                        <PublicItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {ceRoll} itemName = {"chicken_egg_roll"} itemTitle = {translations[0].translatedText} itemType = {"3"} />
                        <PublicItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {cShrimp} itemName = {"crispy_shrimp"} itemTitle = {translations[1].translatedText} itemType = {"3"} />
                        
                        <AddSeasonal />

                    </main>
                </div>
            </div>
        </>
    );
}

export default PublicApps;
