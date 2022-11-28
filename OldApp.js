import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "t" };
  }

  callAPI = () => {
      fetch("http://localhost:3000/roster?id=2")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }, () => console.log(res)));
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p className="App-intro">{this.state.apiResponse}</p>
          <button onClick={this.callAPI}>Make Call</button>
        </header>
      </div>
    );
  }
}

export default App;
