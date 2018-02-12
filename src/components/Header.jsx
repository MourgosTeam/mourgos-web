import React, { Component } from 'react';
import './Header.css';

import {UISref} from '@uirouter/react';
import {GetIt} from '../helpers/helpers';


const logo = "/images/mourgos-logo-white.png";

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
        isSiteOpen: true,
        workingHours: ""
      };

    GetIt('/globals/mourgos/status', 'GET').then((data) => data.json())
    .then((data) => {
      const status = parseInt(data.Status, 10) || 0;
      this.setState({isSiteOpen: status === 1});
    });

    GetIt('/globals/MourgosWorkingHours', 'GET').then((data) => data.json())
    .then((data) => {
      this.setState({workingHours: data.Value});
    });
  }
  render() {
    return[
          <div key={'closedSite'} className="container-fluid text-center alert-warning mb-0">
            {this.state.isSiteOpen === false ?
              <div id='siteStatus' className="pt-4 pb-4">
                <p>
                Ο Μούργος είναι κλειστός!<br />
                Μπορείς να πλοηγηθείς αλλά δεν μπορείς να κάνεις νέες παραγγελίες.<br />
                </p>
                <b>
                Ανοιχτά<br />
                Δευτέρα - Παρασκευή <br />
                {this.state.workingHours}
                </b>
              </div>
            : ''}
          </div>,
          <header key={'siteHeader'} className="navbar navbar-expand-lg navbar-light bg-first">
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
                      <span>{ (this.props.address) ? ("Ο Μούργος θα έρθει : " + this.props.address ) : ""}</span>
                    </div> 
                    { this.props.lastOrder ? (
                    <div className="col-12 links">
                      <ul>
                        <li>
                          {
                          //<UISref to="foodiscoming" params={{ orderId : this.props.lastOrder}} className="btn btn-primary last-order pointer">
                          }
                            <a href={'/readytoeat/' + this.props.lastOrder}>
                              <span className="btn btn-sm btn-primary ">Τελευταία παραγγελία</span>
                            </a>
                          {
                          //</UISref>
                          }
                        </li>
                      </ul>
                    </div>
                    ) :""}                
                  </div>
              </div>
            </header>];
  }
}

export default Header;
