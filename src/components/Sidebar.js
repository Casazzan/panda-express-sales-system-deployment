import React from "react";
import {SidebarData} from './SidebarData'
import Logo from '../panda-logo.png'
import "../App.css";

function Sidebar() {

  return (
    <div className="Sidebar"> 
      <ui className="SidebarList">
        <li className="logo"> <a href="/view"><img src={Logo}/></a> </li>
        {SidebarData.map((val, key) => {
          return (
            <li 
              className="row"
              id={window.location.pathname == val.link ? "active" : ""}
              key={key} 
              onClick={()=> {
                window.location.pathname=val.link;
              }}
            >
            {" "}  
            <div id="icon">{val.icon}</div> {" "}
            <div id="title">
              {val.title}
            </div>
            </li>
          );
        })}
      </ui>
    </div>
  );
}

export default Sidebar;
