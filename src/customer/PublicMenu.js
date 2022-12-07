import React from "react";
import PublicHeader from "./PublicCustomer/PublicHeader";
import MenuCont from "./PublicCustomer/PublicMenuContainer";
import Entrees from "./PublicCustomer/PublicEntrees";
import Sides from "./PublicCustomer/PublicSides";
import Appetizers from "./PublicCustomer/PublicApps";
import "./container.css";

class PublicMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {view: "all"}
  }

  setView(view) {
    this.setState({view: view});
  }

  render() {

    let content;
    if(this.state.view === "all")
      content = <MenuCont />
    else if (this.state.view === "entrees")
      content = <Entrees />
    else if (this.state.view === "sides")
      content = <Sides />
    else if (this.state.view === "apps")
      content = <Appetizers />
    return (
      <div className="container">

        <PublicHeader callback={(view) => this.setView(view)} goBack={() => this.props.goBack()}/>
        {content}
        
      </div>
    );
  }
}

export default PublicMenu;