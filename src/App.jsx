import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Catalogue from './components/Catalogue.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="navbar navbar-default">
          <div className="container">
            <img src={logo} className="App-logo navbar-header" alt="logo" />
            
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-lg-9">
              <Catalogue id="1" mode="normal"></Catalogue>
            </div>
            <div className="col-xs-12 col-md-4 col-lg-3">
              BASKET
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
