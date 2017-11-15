import React, { Component } from 'react';
import './App.css';

import AllCataloguesView from './components/AllCataloguesView.jsx'
import CatalogueView from './components/CatalogueView.jsx'
import Checkout from './components/Checkout.jsx'
import Home from './components/Home.jsx'
import { GetIt } from './helpers/helpers.jsx'
import Header  from './components/Header.jsx'

import {UIRouter, UIView, pushStateLocationPlugin,servicesPlugin} from '@uirouter/react';


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
      <UIRouter plugins={[pushStateLocationPlugin,servicesPlugin]} states={this.uistates}>
      <div className="App">
        <Header username={this.state.username} address={this.state.address}></Header>
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
                Παρέχοντας το δικό του στόλο διανομέων, εξασφαλίζουμε οτι η παραγγελία σου θα φτάσει άμεσα, απαλλάσσοντας παράλληλα τον καταστηματάρχη απο τη διαχείρηση του delivery.
                <br />
                <br />
                Ο Μούργος είναι... το delivery όπως θα έπρεπε να είναι.
                </div>
              </div>
              <div className="social col-12 col-md-4 offset-md-2 text-center text-md-right">
                <div className="">
                  Ακολούθησε τον Μούργο!
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
