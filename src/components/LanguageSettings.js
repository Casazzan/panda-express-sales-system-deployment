import React from 'react'
import {useState} from 'react'

const LanguageSettings = (props) => {
  
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // console.log("the languages are: ", props.languageList);
  const languageNames = []
  if (props.languageList == null) {
    return (
      <div/>
    )
  }
  else {
    for (let i = 0; i < props.languageList.length; i++) {
      const item = props.languageList[i];
      const languageSelector = (
        <option value={item.language}>{item.name}</option>)
        languageNames.push(languageSelector);
    }
    return ( 
      <div>
      <select name="language" id="languageSelector" onChange={(e) =>{
        const selectedLanguage = e.target.value;
        setSelectedLanguage(selectedLanguage);
      }}>
        {languageNames}
      </select>
      <span id="selectedLanguageDiv" hidden>
      {selectedLanguage}
      </span>
      </div>
    );
  }
}

export default LanguageSettings
