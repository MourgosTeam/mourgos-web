import React, { Component } from 'react';
import './App.css';

import AllCataloguesView from './components/AllCataloguesView.jsx'
import CatalogueView from './components/CatalogueView.jsx'
import Home from './components/Home.jsx'
import { GetIt } from './helpers/helpers.jsx'
import Header  from './components/Header.jsx'

import {UIRouter, UIView, UISref, pushStateLocationPlugin} from '@uirouter/react';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      basketItems :  [],
      username : "",
      address : ""
    }

    // TO - DO
    //this.loadFromStorage();

    this.uistates = [{
      name : "home",
      url  : "/",
      component: Home
    },
    {
      name : "allcatalogues",
      url  : "/catalogues",
      component: AllCataloguesView
    },
    {
      name: 'about',
      url: '/about',
      component: () => <h3>Its the UI-Router hello world app!</h3>
    },
    {
      name : "catalogues",
      url  : "/:catalogueURL",
      component: CatalogueView,
      resolve:[{
        token: "catalogueURL",
        deps : ['$transition$'],
        resolveFn : (trans) =>{
          return Promise.resolve(trans.params().catalogueURL);
        }
      },
      {
        token: "catalogue",
        deps : ['$transition$'],
        resolveFn : (trans) =>{
          var curl = trans.params().catalogueURL;
          return GetIt("/catalogues/"+curl , "GET")
          .then(function(data){
            return data.json();
          })
        }
      }]
    }];
  }

  onCredentialChange = () => {
    var username = localStorage.getItem('username');
    var address  = localStorage.getItem('user_address');
    this.setState({
      username : username,
      address  : address
    });
  }

  render() {
    return (
      <UIRouter plugins={[pushStateLocationPlugin]} states={this.uistates}>
      <div className="App">
        <Header username={this.state.username} address={this.state.address}></Header>
        <div className="stretch">
          <UIView render={(Component, props) => {
              return <Component {...props} onCredentialChange={this.onCredentialChange} />
          }}/>
        </div>

        <footer className="footer text-center">
          <span>Mourgos.gr</span>
        </footer>
      </div>
      </UIRouter>
    );
  }
}

export default App;
