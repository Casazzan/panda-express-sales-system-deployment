import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const RosterDisplay = (props) => {
  const [translations, setTranslations] = useState([
    { translatedText: "Employee_Name" }, 
    { translatedText: "Employee_ID" }, 
    { translatedText: "Position" }, 
    { translatedText: "Normal" }, 
    { translatedText: "Manager" }, 
  ])
  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "Employee_Name");
      encodedParams.append("q", "Employee_ID");
      encodedParams.append("q", "Position");
      encodedParams.append("q", "Manager");
      encodedParams.append("q", "Normal");
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
    changeLanguage()
    // console.log("translated orderhistory: ", translations);
    // console.log("translated Transaction_ID: ", translations[0].translatedText);
  }, [setTranslations]);
  
  console.log(props.rosterList);
  const items = []
  if (!props.rosterList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td>{ translations[0].translatedText } </td>
      <td>{ translations[1].translatedText } </td>
      <td>{ translations[2].translatedText } </td>
    </tr>
  )
  var manager = "help";
  for (let i = 0; i < props.rosterList.length; i++) {
    const item = props.rosterList[i];
    if (item.is_manager) {
      console.log("HERE");
      manager = translations[3].translatedText;
    }
    else {
      manager = translations[4].translatedText;
    }
    const RosterDisplay = (
      <tr>
        <td>{item.employee_id}</td>
        <td>{item.employee_name}</td>
        <td>{manager}</td>
      </tr>)
      items.push(RosterDisplay);
  }
  return (
    <table className="RosterTable">
      {items}
    </table>
    )
}

export default RosterDisplay
