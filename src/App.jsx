import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AllCataloguesView from './components/AllCataloguesView.jsx'
import CatalogueView from './components/CatalogueView.jsx'


import {UIRouter, UIView, UISref, UISrefActive, pushStateLocationPlugin} from '@uirouter/react';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      basketItems :  []
    }

    // TO - DO
    //this.loadFromStorage();

    this.uistates = [{
      name : "home",
      url  : "/home",
      component: AllCataloguesView
    },
    {
      name: 'about',
      url: '/about',
      component: () => <h3>Its the UI-Router hello world app!</h3>
    },
    {
      name : "catalogues",
      url  : "/catalogues/:catalogueId",
      component: CatalogueView,
      resolve:[{
        token: "catalogue",
        deps : ['$transition$'],
        resolveFn : (trans) =>{
          return Promise.resolve(trans.params().catalogueId);
        }
      }]
    }];
  }

  render() {
    return (
      <UIRouter plugins={[pushStateLocationPlugin]} states={this.uistates}>
      <div className="App">
        <header className="navbar navbar-default">
          <div className="container">
            <UISref to="home">
              <img src={logo} className="App-logo navbar-header" alt="logo" />
            </UISref>
            
          </div>
        </header>
        <div>
          <UISrefActive class="active">
            <UISref to="home"><a>Hello</a></UISref>
          </UISrefActive>
          <UISrefActive class="active">
            <UISref to="about"><a>About</a></UISref>
          </UISrefActive>
          <UIView render={(Component, props) => {
              return <Component {...props} />
          }}/>
        </div>
      </div>
      </UIRouter>
    );
  }
}

export default App;
