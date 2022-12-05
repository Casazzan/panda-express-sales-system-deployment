import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import axios from 'axios'
import LanguageSettings from './LanguageSettings'


function Accessibility() {

  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState(null);
  const [translatedText, setTranslatedText] = useState('Submit');

  window.addEventListener('storage', (e) => {
      console.log("change to local storage!");
      changeText()
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

  const changeText = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (localStorage.getItem("language") == null) {
      localStorage.setItem("language", JSON.stringify("en"));
    }
    console.log(localStorage.getItem("language"))
    if (localStorage.getItem("language") != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Submit");
      encodedParams.append("q", "Home");
      encodedParams.append("q", "Sales");
      encodedParams.append("q", "Employee");
      encodedParams.append("q", "Inventory");
      encodedParams.append("q", "Accessibility");
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
          localStorage.setItem("home", JSON.stringify(response.data.data.translations[1].translatedText));
          localStorage.setItem("sales", JSON.stringify(response.data.data.translations[2].translatedText));
          localStorage.setItem("employee", JSON.stringify(response.data.data.translations[3].translatedText));
          localStorage.setItem("inventory", JSON.stringify(response.data.data.translations[4].translatedText));
          localStorage.setItem("accessibility", JSON.stringify(response.data.data.translations[5].translatedText));
      }).catch(function (error) {
          console.error(error);
      });
    }
    else {
      setTranslatedText("Submit")
      localStorage.setItem("home", JSON.stringify("Home"));
      localStorage.setItem("sales", JSON.stringify("Sales"));
      localStorage.setItem("employee", JSON.stringify("Employee"));
      localStorage.setItem("inventory", JSON.stringify("Inventory"));
      localStorage.setItem("accessibility", JSON.stringify("Accessibility"));
    }
}


  // console.log('languages', languages)
  
  useEffect(() => {
    console.log("use effect here")
    getLanguages()
    if (localStorage.getItem("language") == null) {
      localStorage.setItem("language", JSON.stringify("en"));
      console.log("made it to change text")
      changeText()
      window.location.reload(false)
    }
    else {
      changeText()
    }

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
