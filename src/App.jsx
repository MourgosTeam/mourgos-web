import React, { Component } from 'react';
import './App.css';

import AllCataloguesView from './components/AllCataloguesView.jsx'
import CatalogueView from './components/CatalogueView.jsx'
import Checkout from './components/Checkout.jsx'
import OrderDetails from './components/OrderDetails.jsx'
import Home from './components/Home.jsx'
import { GetIt } from './helpers/helpers.jsx'
import Header  from './components/Header.jsx'

import {UIRouter, UIView, pushStateLocationPlugin,servicesPlugin} from '@uirouter/react';

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
      <UIRouter plugins={[pushStateLocationPlugin,servicesPlugin]} states={this.uistates}>
      <div className="App">
        <Header username={this.state.username} address={this.state.address} lastOrder={this.state.lastorder}></Header>
        <div className="stretch">
          <UIView render={(Component, props) => {
              return <Component {...props} onCredentialChange={this.onCredentialChange} />
          }}/>
        </div>

        <footer className="footer text-center">
          <div className="container">
            <div className="row"> 
              <div className="col-12 d-none col-md-6 d-md-block text-left who-we-are">
                <div className="title">Τι είναι ο Mούργος;</div>
                <div>
                Ο Μούργος είναι η πρώτη ολοκληρωμένη πλατφόρμα delivery στην Ελλάδα. 
                Παρέχοντας το δικό μας στόλο διανομέων, εξασφαλίζουμε ότι η παραγγελία σου θα φτάσει άμεσα, απαλλάσσοντας παράλληλα τον καταστηματάρχη από τη διαχείριση του delivery.
                <br />
                <br />
                Ο Μούργος είναι... το delivery όπως θα έπρεπε να είναι.
                </div>
              </div>
              <div className="social col-12 col-md-4 offset-md-2 text-center text-md-right">
                <div className="">
                  Ακολούθησε το Μούργο!
                </div>
                <div className="">
                  <span className="fa fa-facebook-square"></span>
                  <span className="fa fa-twitter-square"></span>
                  <span className="fa fa-youtube-square"></span>
                </div>
                <br />
                <div className="copyright">
                  Copyright © 2017 Mourgos.gr
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </UIRouter>
    );
  }
}

export default App;
