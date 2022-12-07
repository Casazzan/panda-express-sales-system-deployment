import {useState, useEffect} from 'react'
import axios from 'axios'
/**
 * Button for the landing page of customer
 * @function
 * @param {string} Name - The name the React component is going to display.
 * @returns {Component} A React component displaying the name object passed in.
 */
const CustomerDishChoiceButton = ( { Name }) => {
  const [translatedName, setTranslatedName] = useState('Manager View');
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
          setTranslatedName(response.data.data.translations[0].translatedText);
      }).catch(function (error) {
          console.error(error);
      });
    }
    else {
      setTranslatedName(input)
    }
  }
  useEffect(() => {
    // Update the document title using the browser API
    console.log("local storage is: ", JSON.parse(localStorage.getItem("language")));
    changeLanguage(Name);
  });
  return ( 
    <div id = "CustomerDishChoiceButton">
      <h1>{translatedName}</h1>
    </div>
  )
}



export default CustomerDishChoiceButton