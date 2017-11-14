import React, { Component } from 'react';

import './Partners.css';
import Catalogue from './Catalogue.jsx'

import {GetIt} from '../helpers/helpers.jsx'

class Partners extends Component {
  constructor(props){
    super(props);

    // TO - DO
    //this.loadFromStorage();
    this.state = {
      catalogues :  []
    }
    this.getCatalogues();
  }

  getCatalogues = () => {
    GetIt("/catalogues/" , "GET")
    .then(function(data){
      return data.json();
    })
    .then((data) => {
      this.allData = data;
      return data.map(function(object, index){
        return <Catalogue id={object.id} object={object} key={index} mode="card"></Catalogue>; 
      });
    })
    .then(
     (data) => { this.setState({catalogues : data}) }
    );
  }

  render = () => {
    return (
      <div className="container all-catalogues-view">
        <div className="row">
          {this.state.catalogues}
        </div>
      </div>
    );
  }
}
export default Partners;