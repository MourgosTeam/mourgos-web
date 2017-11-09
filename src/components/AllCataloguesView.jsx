import React, { Component } from 'react';

import './AllCataloguesView.css';
import Catalogue from './Catalogue.jsx'

import {GetIt} from '../helpers/helpers.jsx'

class AllCataloguesView extends Component {
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
        return <Catalogue id={object.id} object={object} key={index} mode="minimal"></Catalogue>; 
      });
    })
    .then(
     (data) => { this.setState({catalogues : data}) }
    );
  }


  onDataChange = ( data ) =>{
    this.setState({
      catalogues : data
    });
  }

  render = () => {
    return (
      <div className="container">
        <div className="row">
           {/*<div className="col-xs-12 col-md-4 col-lg-3 hidden-xs">
           <SearchFilters items={this.state.basketItems} onChange={this.onDataChange}/>
          </div>*/}
          <div className="col-xs-12 col-md-12 col-lg-12">
            {this.state.catalogues}
          </div>
        </div>
      </div>
    );
  }
}
export default AllCataloguesView;