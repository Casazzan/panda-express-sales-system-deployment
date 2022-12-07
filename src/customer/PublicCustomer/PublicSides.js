import React from "react";
import PublicItemBox from "../PublicItemBox";
//import { Link } from "react-router-dom";
import "../menuContainer.css";
// item images
import mixedVeg from '../mixedVeg.png';
import chowMein from '../chowMein.png';
import friedRice from '../friedRice.png';
import whiteRice from '../whiteRice.png';
import brownRice from '../brownRice.png';

import AddSeasonal from "./PublicAddSeasonal";

import {useState, useEffect} from 'react'
import axios from 'axios'
      
const PublicSides = (props) => {
      
              const [translations, setTranslations] = useState([
                { translatedText: "Mixed Vegetables" }, 
                { translatedText: "Chow Mein" }, 
                { translatedText: "Fried Rice" }, 
                { translatedText: "White Steamed Rice" }, 
                { translatedText: "Brown Steamed Rice" }, 
              ])
          
              const changeLanguage = () => {
                // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
                if (JSON.parse(localStorage.getItem("language")) != "en") {
                  console.log("sent query")
                  const encodedParams = new URLSearchParams();
                  encodedParams.append("q", "Mixed Vegetables");
                  encodedParams.append("q", "Chow Mein");
                  encodedParams.append("q", "Fried Rice");
                  encodedParams.append("q", "White Steamed Rice");
                  encodedParams.append("q", "Brown Steamed Rice");
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
            
                        <PublicItemBox itemImg = {mixedVeg} className = "img" itemTitle = {translations[0].translatedText}  />
                        <PublicItemBox itemImg = {chowMein} className = "img" itemTitle = {translations[1].translatedText} />
                        <PublicItemBox itemImg = {friedRice} className = "img" itemTitle = {translations[2].translatedText} />
                        <PublicItemBox itemImg = {whiteRice} className = "img" itemTitle = {translations[3].translatedText} />
                        <PublicItemBox itemImg = {brownRice} className = "img" itemTitle = {translations[4].translatedText} />

                        <AddSeasonal />

                    </main>
                </div>
            </div>
        </>
    );
}

export default PublicSides;
