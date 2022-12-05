import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import axios from 'axios'
import LanguageSettings from './LanguageSettings'


function Accessibility() {

  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState(null);
  const [translatedText, setTranslatedText] = useState('Submit');
  const [color, setColor] = useState('');

  window.addEventListener('storage', (e) => {
      console.log("change to local storage!");
      changeText("Submit")
  });
  
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

  const changeText = (input) => {
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
        console.log(response.data);
        setTranslatedText(response.data.data.translations[0].translatedText);
    }).catch(function (error) {
        console.error(error);
    });
  }
  else {
    setTranslatedText(input)
  }
}


  // console.log('languages', languages)
  
  useEffect(() => {
    console.log("use effect here")
    getLanguages()
  }, [])

  const changeLanguage = () => {
    var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    setLanguage(selected)
    localStorage.setItem("language", JSON.stringify(selected));
    window.dispatchEvent(new Event("storage"));
    const rawLanguage = localStorage.getItem("language");
    const language = JSON.parse(rawLanguage);
    console.log("LOCAL STORAGE: ", language);
  }

  return(
    <div>
        <LanguageSettings 
          languageList={languages}/>
        <button className="SubmitLanguage" onClick={() => changeLanguage()}>{translatedText}</button>
    </div>
  );
}

export default Accessibility
