import React, { Component } from 'react';
import './Category.css';

import { GetIt } from '../helpers/helpers.js'

import Product from './Product.jsx'

class Category extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;

    this.state = { 
      products : []
    };

    this.getProducts();
  }


  getProducts(){
    GetIt("/products/"+this.id , "GET")
    .then(function(data){
      return data.json();
    })
    .then(function(data){
      return data.map(function(object, index){
        return <Product id={object.id} object={object} key={index}> { object.Name } </Product>; 
      });
    })
    .then(
      (data) => this.setState({products : data})
    );
  }

  render() {
    return (
      <div className="Category">
          {this.state.products}
      </div>
    );
  }
}

export default Category;
