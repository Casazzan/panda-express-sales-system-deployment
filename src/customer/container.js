import React from "react";
import Header from "./header";
import MenuCont from "./menuContainer";
import Entrees from "./entrees";
import Sides from "./sides";
import Appetizers from "./apps";
import "./container.css";

class Container extends React.Component {

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
      content = <MenuCont addToCart={(itemToAdd, index) => this.props.addToCart(itemToAdd, index)}/>
    else if (this.state.view === "entrees")
      content = <Entrees addToCart={(itemToAdd, index) => this.props.addToCart(itemToAdd, index)}/>
    else if (this.state.view === "sides")
      content = <Sides addToCart={(itemToAdd, index) => this.props.addToCart(itemToAdd, index)}/>
    else if (this.state.view === "apps")
      content = <Appetizers addToCart={(itemToAdd, index) => this.props.addToCart(itemToAdd, index)}/>
    return (
      <div className="container">
        <Header callback={(view) => this.setView(view)} goBack={() => this.props.goBack()}/>
        {content}
      </div>
    );
  }
}

export default Container;