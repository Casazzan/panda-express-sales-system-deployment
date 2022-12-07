import { useState, useEffect } from "react";
import "../App.css";
import Summary from './OrderHistoryDisplay'
import axios from 'axios'

function OrderHistory() {
  const [orderHistorySummary, setOrderHistorySummary] = useState('0');

  const [titleText, setTitleText] = useState('Manager View');

  useEffect(() => {
      // Update the document title using the browser API
      console.log("local storage is: ", JSON.parse(localStorage.getItem("language")));
      changeLanguage("Manager View");
  });

  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Current Inventory");
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
      setTitleText("Current Inventory")
    }
  }
  useEffect(() => {
    let ignore = false;

    if (!ignore)  querySummary()
    return () => { ignore = true; }
    },[]);

  const querySummary = async() => {
    const promise = fetch(`http://localhost:5003/order_history/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setOrderHistorySummary(result);
  };

  return (
    <div>
      <h2>{titleText}</h2>
    <Summary orderList={orderHistorySummary}/>
    </div>
  );
}

export default OrderHistory;
