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
    return  <header className="navbar navbar-default">
              <div className="container">
                <UISref to="home" className="pointer">
                  <div className="navbar-header logo-container">
                    <img src={logo}  alt="logo" className="App-logo" />
                    <span className="logo-text">Mourgos.gr</span>
                  </div>
                </UISref>
                  <div className="pull-right login text-right row">
                    <div className="col-xs-12 login-name">
                      <span>{this.props.username}</span>
                    </div> 
                    <div className="col-xs-12 login-address">
                      <span>{this.props.address}</span>
                    </div> 
                    <div className="col-xs-12 login-links">
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
            </header>;
  }
}

export default Header;
