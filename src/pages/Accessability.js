import React from 'react'
import Sidebar from '../components/Sidebar'
import Settings from '../components/Settings';

const Accessibility = () => {
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
