import React from 'react'
import Sidebar from '../components/Sidebar'
import Settings from '../components/Settings';
import { useState, useEffect } from "react";
import axios from 'axios'

const Accessibility = () => {

  /*manually create fields for each translation???*/
  const [titleText, setTitleText] = useState('Accessibility Settings');

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  window.addEventListener('storage', (e) => {
      // console.log("change to local storage!");
      changeLanguage();
      timeout(1000);
      window.location.reload(false);
  });


  useEffect(() => {
      // Update the document title using the browser API
      // console.log("local storage is: ", JSON.parse(localStorage.getItem("language")));
      changeLanguage();
  });
  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) == null) {
      localStorage.setItem("langauge", JSON.stringify("en"));
    }
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Accessibility Settings");
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
          setTitleText(response.data.data.translations[0].translatedText);
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
      setTitleText("Accessibility Settings")
      localStorage.setItem("home", JSON.stringify("Home"));
      localStorage.setItem("sales", JSON.stringify("Sales"));
      localStorage.setItem("employee", JSON.stringify("Employee"));
      localStorage.setItem("inventory", JSON.stringify("Inventory"));
      localStorage.setItem("accessibility", JSON.stringify("Accessibility"));
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
      </div>
    </div>
  )
}

export default Accessibility
