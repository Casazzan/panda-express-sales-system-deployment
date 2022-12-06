import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


const OrderHistoryDisplay = (props) => {

  const [translations, setTranslations] = useState([
    { translatedText: "Transaction_ID" }, 
    { translatedText: "Employee_ID" }, 
    { translatedText: "Date" }, 
    { translatedText: "Type_of_Dish" }, 
    { translatedText: "Entree_Dish" }, 
    { translatedText: "Entree_Amt_Servings" }, 
    { translatedText: "Entree_Amt_Servings" },
    { translatedText: "Side_Ingredients"},
    { translatedText: "Appetizer_Ingredients"},
    { translatedText: "Side_Amt_Servings"},
    { translatedText: "Appetizer_Ingredients"},
    { translatedText: "Appetizer_Amt_Servings"},
    { translatedText: "Price"}
  ])
  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      console.log("not english")
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Transaction_ID");
      encodedParams.append("q", "Employee_ID");
      encodedParams.append("q", "Date");
      encodedParams.append("q", "Type_of_Dish");
      encodedParams.append("q", "Entree_Dish");
      encodedParams.append("q", "Entree_Amt_Servings");
      encodedParams.append("q", "Side_Ingredients");
      encodedParams.append("q", "Appetizer_Ingredients");
      encodedParams.append("q", "Side_Amt_Servings");
      encodedParams.append("q", "Appetizer_Ingredients");
      encodedParams.append("q", "Appetizer_Amt_Servings");
      encodedParams.append("q", "Price");
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
          // setTranslations(response.data.data.translations);
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
    console.log("use effect for order history display")
    console.log("changed language")
    changeLanguage()
    // console.log("translated orderhistory: ", translations);
    // console.log("translated Transaction_ID: ", translations[0].translatedText);
  }, [setTranslations]);

  
  const items = []
  if (!props.orderList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td>{ translations[0].translatedText } </td>
      <td>{ translations[1].translatedText } </td>
      <td>{ translations[2].translatedText } </td>
      <td>{ translations[3].translatedText } </td>
      <td>{ translations[4].translatedText } </td>
      <td>{ translations[5].translatedText } </td>
      <td>{ translations[6].translatedText } </td>
      <td>{ translations[7].translatedText } </td>
      <td>{ translations[8].translatedText } </td>
      <td>{ translations[9].translatedText } </td>
      <td>{ translations[10].translatedText } </td>
    </tr>
  )
  for (let i = 0; i < props.orderList.length; i++) {
    if (i < 50) {
    const item = props.orderList[i];
    const itemDisplay = (
      <tr>
        <td>{item.transaction_id}</td>
        <td>{item.employee_id}</td>
        <td>{item.date}</td>
        <td>{item.type_of_dish}</td>
        <td>{item.entree_dish}</td>
        <td>{item.entree_amt_servings}</td>
        <td>{item.side_ingredients}</td>
        <td>{item.side_amt_servings}</td>
        <td>{item.appetizer_ingredients}</td>
        <td>{item.appetizer_amt_servings}</td>
        <td>{item.price}</td>
      </tr>)
      items.push(itemDisplay);
    }
  }
  return (
    <table className="OrderTable">
      {items}
    </table>
    )
}

export default OrderHistoryDisplay
