import React from 'react'
import Sidebar from '../components/Sidebar'
import logo from '../team52.png'

//         <img className="FooterLogo" src={logo}/>
const Home = () => {
  return (
    <div>
      <Sidebar />
      <div className="Parallax">
        <div className="TitleDot"> 
          <h1>
            Manager View
          </h1>
        </div>
      </div>
      <div className="Footer">
      </div>
    </div>
  )
}

export default Home
