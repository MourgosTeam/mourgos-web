import React, { Component } from 'react';
import './Category.css';

import { GetIt } from '../helpers/helpers.jsx'

import Product from './Product.jsx'

class Category extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;

    this.mode = props.mode;

    this.state = { 
      products : [],
      object : props.object || {}
    };
    

    switch(this.mode){
      case 'minimal':
        if(!props.object)
        this.getMe();
        break;
      case 'normal':
        this.getProducts();
        break;
    }
    
  }

  getMe(){
    GetIt("/categories/"+this.id , "GET")
    .then(function(data){
      return data.json();
    })
    .then( (data) => this.setState({ object : data }));
  }

  getProducts(){
    GetIt("/products/category/"+this.id , "GET")
    .then(function(data){
      return data.json();
    })
    .then(function(data){
      return data.map(function(object, index){
        return <Product id={object.id} object={object} key={index} indexKey={index} mode="minimal"> { object.Name } </Product>; 
      });
    })
    .then(
      (data) => this.setState({products : data})
    );
  }

  renderNormal(){
    return (
      <div className="col-xs-12">
        <div className="col-xs-12 category-title text-left">
            {this.state.object.Name}
        </div>
        <div className="row col-xs-12 is-flex">
            {this.state.products}
        </div>
      </div>
    );
  }

  renderMinimal(){
    return (
      <div className="col-xs-12">
        {this.state.object.Name}
      </div>
    );
  }

  render() {
    switch(this.mode){
      case 'normal':
        return this.renderNormal();
      default:
      case 'minimal':
        return this.renderMinimal();

    }
  }
}

export default Category;
