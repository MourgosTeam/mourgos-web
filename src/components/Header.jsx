import React, { Component } from 'react';
import './Header.css';

import {UISref} from '@uirouter/react';


const logo = "/images/mourgos-logo-white.png";

class Header extends Component {
  constructor(props){
    super(props);
    return;
  }
  render() {
    return  <header className="navbar navbar-expand-lg navbar-light bg-first">
              <div className="container">
                <UISref to="home" className="pointer">
                  <div className="navbar-header logo-container">
                    <img src={logo}  alt="logo" className="App-logo" />
                    <span className="logo-text">Mourgos.gr</span>
                  </div>
                </UISref>
                  <div className="pull-right login text-lg-right text-center row">
                    <div className="col-12 login-name">
                      <span>{this.props.username}</span>
                    </div> 
                    <div className="col-12 login-address">
                      <span>{ (this.props.address) ? ("Ο Μούργος θα έρθει " + this.props.address ) : ""}</span>
                    </div> 
                    { this.props.lastOrder ? (
                    <div className="col-12 links">
                      <ul>
                        <li>
                          <UISref to="foodiscoming" params={{orderId : this.props.lastOrder}} className="btn btn-primary last-order pointer">
                              <span>Τελευταία παραγγελία</span>
                          </UISref>
                        </li>
                      </ul>
                    </div> 
                    ) :""}
                  
                  </div>
              </div>
            </header>;
  }
}

export default Header;
