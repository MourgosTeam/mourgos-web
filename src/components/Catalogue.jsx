import React, { Component } from 'react';
import './Catalogue.css';

import { GetIt } from '../helpers/helpers.js'
import Category from "./Category.jsx"

class Catalogue extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;

    this.state = { 
      categories : []
    };

    this.getCategories();
  }


  getCategories(){
    GetIt("/categories/"+this.id , "GET")
    .then(function(data){
      return data.json();
    })
    .then(function(data){
      return data.map(function(object, index){
        return <Category id={object.id} object={object} key={index}> { object.Name } </Category>; 
      });
    })
    .then(
      (data) => this.setState({categories : data})
    );
  }

  render() {
    return (
      <div className="Catalogue">
          {this.state.categories}
      </div>
    );
  }
}

export default Catalogue;
