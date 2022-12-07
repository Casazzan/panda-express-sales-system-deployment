import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const CriticalItemsDisplay = (props) => {
  const [translations, setTranslations] = useState([
    { translatedText: "Name" }, 
    { translatedText: "Restock" }, 
    { translatedText: "Amount" }, 
  ])
  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Name");
      encodedParams.append("q", "Restock");
      encodedParams.append("q", "Amount");
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
  }, [setTranslations]);

  
  console.log(props.itemList);
  const items = []
  if (!props.itemList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td> { translations[0].translatedText } </td>
      <td> { translations[1].translatedText } </td>
      <td> { translations[2].translatedText } </td>
    </tr>
  )
  for (let i = 0; i < props.itemList.length; i++) {
    const item = props.itemList[i];
    const itemDisplay = (
      <tr>
        <td>{item.item_name}</td>
        <td>{item.servings}</td>
        <td>{item.restock_quantity}</td>
      </tr>)
      items.push(itemDisplay);
  }
  return (
    <table>
      {items}
    </table>
    )
}

export default CriticalItemsDisplay
