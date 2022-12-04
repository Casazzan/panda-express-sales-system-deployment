import React from 'react'
import Sidebar from '../components/Sidebar'
import Settings from '../components/Settings';
import { useState, useEffect } from "react";
import axios from 'axios'

const Accessibility = () => {


  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState(null);
  const [color, setColor] = useState('');



  return (
    <div>
      <Sidebar />
      <div className="Parallax-Accessibility">
        <div className="TitleDot-Accessibility"> 
          <h1>
            Accessibility Settings
          </h1>
          <Settings />
        </div>
      </div>
      <div className="Footer">
        Footer
      </div>
    </div>
  )
}

export default Accessibility
