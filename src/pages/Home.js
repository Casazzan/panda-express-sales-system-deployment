import React from 'react'
import Sidebar from '../components/Sidebar'
import logo from '../team52.png'
import { useState, useEffect } from "react";
import axios from 'axios'

//         <img className="FooterLogo" src={logo}/>
const Home = () => {

  const [titleText, setTitleText] = useState('Manager View');

  window.addEventListener('storage', (e) => {
      console.log("change to local storage!");
      changeLanguage("Manager View");
  });

  useEffect(() => {
      // Update the document title using the browser API
      console.log("local storage is: ", JSON.parse(localStorage.getItem("language")));
      changeLanguage("Manager View");
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
      <div className="Parallax">
        <div className="TitleDot"> 
          <h1>
          {titleText}
          </h1>
        </div>
      </div>
      <div className="Footer">
      </div>
    </div>
  )
}

export default Home
