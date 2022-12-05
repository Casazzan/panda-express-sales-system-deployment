import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import axios from 'axios'


function LanguageSettings() {


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
        </select> 
        <p></p>
      </form>
    {language}
    </div>
  );
}

export default LanguageSettings
