import React from 'react'
import Sidebar from '../components/Sidebar'

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
      Footer
      </div>
    </div>
  )
}

export default Home
