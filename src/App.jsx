import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Catalogue from './components/Catalogue.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Catalogue id="1"></Catalogue>
      </div>
    );
  }
}

export default App;
