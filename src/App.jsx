import React, { Component } from 'react';
import './App.css';

import AllCataloguesView from './components/AllCataloguesView.jsx'
import CatalogueView from './components/CatalogueView.jsx'
import Checkout from './components/Checkout.jsx'
import OrderDetails from './components/OrderDetails.jsx'
import Home from './components/Home.jsx'
import { GetIt } from './helpers/helpers.jsx'
import Header  from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import {UIRouterReact, UIRouter, UIView, pushStateLocationPlugin,servicesPlugin} from '@uirouter/react';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-111431659-1'); //Unique Google Analytics tracking number


window.GlobalData = JSON.parse(localStorage.getItem("GlobalData")) || {};

class App extends Component {
  constructor(props){
    super(props);
    
    
    window.storageUpdated = this.storageUpdated;
    var lastorder = localStorage.getItem("lastorder");
    var user_data = JSON.parse(localStorage.getItem('user_data')) || {};
    var username = user_data.name;
    var address  = localStorage.getItem('user_address');
    this.state = {
      basketItems :  [],
      username : username,
      address : address,
      lastorder: lastorder
    }

    GetIt("/globals" , "GET")
    .then(function(data){
      return data.json();
    })
    .then( (data) => {
      localStorage.setItem("GlobalData", JSON.stringify(data));
      window.GlobalData = data
    });
    // TO - DO
    //this.loadFromStorage();

    this.uistates = [{
      name : "home",
      url  : "/",
      component: Home,
      resolve : [{
        token : 'hasCreds',
        deps  : ['$transition$'],
        resolveFn : (trans) => {
          let place = JSON.parse(localStorage.getItem("place"));
          let address,name;
          if(place){
            name = localStorage.getItem("username");
            address = localStorage.getItem("user_address");
          }
          return Promise.resolve({ name : name, address : address, place : place});
        }
      }]
    },
    {
      name : "allcatalogues",
      url  : "/catalogues",
      component: AllCataloguesView
    },
    {
      name : "checkout",
      url  : "/checkout",
      component: Checkout
    },
    {
      name : "foodiscoming",
      url  : "/readytoeat/:orderId",
      component: OrderDetails
    },
    {
      name : "catalogues",
      url  : "/:catalogueURL/",
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

    this.router = new UIRouterReact();
    this.router.plugin(servicesPlugin);
    this.router.plugin(pushStateLocationPlugin);
    this.router.urlService.rules.initial({
      state: 'home'
    });

    this.router.transitionService.onSuccess({}, (trans) => {
      const path = window.location.pathname + window.location.search;
      if(window.location.href.includes("://localhost")) {
        console.log("[Local]Transitioned to " + path);
        return;
      }
      console.log("Transitioned to " + path);
      ReactGA.pageview(path);
    });

    // Register the initial (eagerly loaded) states
    this.uistates.forEach(state => this.router.stateRegistry.register(state));

  }

  storageUpdated = () => {
    var lastorder = localStorage.getItem("lastorder");
    var user_data = JSON.parse(localStorage.getItem('user_data')) || {};
    var username = user_data.name;
    var address  = localStorage.getItem('user_address');
    this.setState({
      lastorder : lastorder,
      username : username,
      address : address
    });
  }

  onCredentialChange = () => {
    var user_data = JSON.parse(localStorage.getItem('user_data')) || {};
    var username = user_data.name;
    var address  = localStorage.getItem('user_address');
    this.setState({
      username : username,
      address  : address
    });
  }

  render() {
    return (
      <UIRouter router={this.router}>
      <div className="App">
        <Header username={this.state.username} address={this.state.address} lastOrder={this.state.lastorder}></Header>
        <div className="stretch">
          <UIView render={(Component, props) => {
              return <Component {...props} onCredentialChange={this.onCredentialChange} />
          }}/>
        </div>
        <Footer />
      </div>
      </UIRouter>
    );
  }
}

export default App;
