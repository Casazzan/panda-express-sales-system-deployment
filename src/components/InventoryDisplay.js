import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const InventoryDisplay = (props) => {
  const [translations, setTranslations] = useState([
    { translatedText: "Item ID" }, 
    { translatedText: "Item Name" }, 
    { translatedText: "Servings" }, 
    { translatedText: "Restock Quantity" }, 
    { translatedText: "Item Price" }, 
    { translatedText: "Food Price" }, 
    { translatedText: "Food Type" }, 
    { translatedText: "Minimum Amount" }, 
  ])
  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Item ID");
      encodedParams.append("q", "Item Name");
      encodedParams.append("q", "Servings");
      encodedParams.append("q", "Restock Quantity");
      encodedParams.append("q", "Item Price");
      encodedParams.append("q", "Food Price");
      encodedParams.append("q", "Food Type");
      encodedParams.append("q", "Minimum Amount");
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

  console.log(props.inventoryList);
  const items = []
  /*https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them
  */
  if (!props.inventoryList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td> {translations[0].translatedText } </td>
      <td> {translations[1].translatedText } </td>
      <td> {translations[2].translatedText } </td>
      <td> {translations[3].translatedText } </td>
      <td> {translations[4].translatedText } </td>
      <td> {translations[5].translatedText } </td>
      <td> {translations[6].translatedText } </td>
    </tr>
  )
  for (let i = 0; i < props.inventoryList.length; i++) {
    const item = props.inventoryList[i];
    const itemDisplay = (
      <tr>
        <td>{item.item_id}</td>
        <td>{item.item_name}</td>
        <td>{item.servings}</td>
        <td>{item.restock_quantity}</td>
        <td>{item.item_price}</td>
        <td>{item.food_type}</td>
        <td>{item.minimum_amount}</td>
      </tr>)
      items.push(itemDisplay);
  }
  return (
    <table>
      {items}
    </table>
    )
}

export default InventoryDisplay
