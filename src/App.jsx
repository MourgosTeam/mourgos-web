import React, { Component } from 'react';
import './App.css';

import AllCataloguesView from './components/AllCataloguesView.jsx'
import CatalogueView from './components/CatalogueView.jsx'
import { GetIt } from './helpers/helpers.jsx'


import {UIRouter, UIView, UISref, pushStateLocationPlugin} from '@uirouter/react';

const logo = "/images/mourgos-logo-white.png";

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
      url  : "/",
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
        token: "catalogueId",
        deps : ['$transition$'],
        resolveFn : (trans) =>{
          return Promise.resolve(trans.params().catalogueId);
        }
      },
      {
        token: "catalogue",
        deps : ['$transition$'],
        resolveFn : (trans) =>{
          var id = trans.params().catalogueId;
          return GetIt("/catalogues/"+id , "GET")
          .then(function(data){
            return data.json();
          })
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
            <UISref to="home" className="pointer">
              <div className="navbar-header logo-container">
                <img src={logo}  alt="logo" className="App-logo" />
                <span className="logo-text">Mourgos.gr</span>
              </div>
            </UISref>
              <div className="pull-right login text-right">
                <div className="row login-name">
                  <span>Δημήτρης</span>
                </div> 
                <div className="row login-address">
                  <span>Άνω Τζουμαγιάς 25</span>
                </div> 
                <div className="row login-links">
                  <ul>
                    <li>
                      <span>Το προφίλ μου</span>
                    </li>
                    <li>
                      <span>Οι παραγγελίες μου</span>
                    </li>
                    <li>
                      <span>Αποσύνδεση</span>
                    </li>
                  </ul>
                </div> 
              </div>
          </div>
        </header>
        <div>
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
