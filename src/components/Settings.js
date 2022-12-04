import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import axios from 'axios'
import LanguageSettings from './LanguageSettings'


function Accessibility() {

  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState(null);
  const [color, setColor] = useState('');

    const getLanguages = () => {
    const options = {
      method: 'GET',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      params: {target: 'en'},
      headers: {
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '8fbc873fd8msh5d43e6022f22f64p15f17ejsnbb456384ba17',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      const allLanguages = response.data.data.languages
      setLanguages(allLanguages)
      console.log("allLanguages: ", allLanguages[0].language)
      // console.log("allLanguages[0]: ", allLanguages[0])

    }).catch(function (error) {
        console.error(error);
    });
  }

  // console.log('languages', languages)
  
  useEffect(() => {
    console.log("use effect here")
    getLanguages()
  }, [])

  const changeLanguage = () => {
    var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    console.log("the selected variable is: ", selected)
    setLanguage(selected)
  }

  return(
    <div>
        <LanguageSettings 
          languageList={languages}/>
        <button className="SubmitLanguage" onClick={() => changeLanguage()}>Submit</button>
    </div>
  );
}

export default Accessibility
