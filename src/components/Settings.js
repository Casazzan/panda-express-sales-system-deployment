import React from "react";
import { useState } from "react";
import "../App.css";


function LanguageSettings() {

  const [language, setLanguage] = useState('');
  const [color, setColor] = useState('');

  return(
    <div>
      <form>
        <label>Change Languages: </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="Spanish">Spanish</option>
          <option value="German">German</option>
          <option value="French">French</option>
          <option value="Simplified Chinese">Simplified Chinese</option>
          <option value="Traditional Chinese">Traditional Chinese</option>
        </select> 
        <p></p>
      </form>
    {language}
    </div>
  );
}

export default LanguageSettings
