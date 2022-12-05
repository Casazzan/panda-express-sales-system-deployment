import React from 'react'
import Sidebar from '../components/Sidebar'
import Settings from '../components/Settings';
import { useState, useEffect } from "react";
import axios from 'axios'

const Accessibility = () => {

  /*manually create fields for each translation???*/
  const [titleText, setTitleText] = useState('Accessibility Settings');

  window.addEventListener('storage', (e) => {
      console.log("change to local storage!");
      changeLanguage("Accessibility Settings");
  });

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
          // console.log(response.data);
          setTitleText(response.data.data.translations[0].translatedText);
      }).catch(function (error) {
          console.error(error);
      });
    }
    else {
      setTitleText(input)
    }
}
  return (
    <div>
      <Sidebar />
      <div className="Parallax-Accessibility">
        <div className="TitleDot-Accessibility"> 
          <h1>
          {titleText}
          </h1>
          <Settings />
        </div>
      </div>
      <div className="Footer">
        Footer
      </div>
    </div>
  )
}

export default Accessibility
