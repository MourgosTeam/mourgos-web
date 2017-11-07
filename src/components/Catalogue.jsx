import React, { Component } from 'react';
import './Catalogue.css';

import { GetIt } from '../helpers/helpers.jsx'
import Category from "./Category.jsx"

import {UISref, UISrefActive} from '@uirouter/react'

class Catalogue extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;

    this.mode = props.mode || "minimal";

    this.openForAdd = props.openForAdd;

    this.state = { 
      categories : [],
      object : props.object || {}
    };

    switch(this.mode){
      case 'minimal':
        break;
      default:
      case 'normal':
        this.getCategories();
        break;
    }
    
    
  }

  getCategories(){
    var self = this;
    GetIt("/categories/catalogue/"+this.id , "GET")
    .then(function(data){
      return data.json();
    })
    .then(function(data){
      return data.map(function(object, index){
        return <Category id={object.id} object={object} key={index} mode="normal" openForAdd={self.openForAdd}> { object.Name } </Category>; 
      });
    })
    .then(
     (data) => this.setState({categories : data})
    );
  }

  renderMinimal(){
    return (
      <div className="col-xs-12 text-left">
        <UISrefActive class="active">
          <UISref to="catalogues" params={{catalogueId:this.props.object.id}}><a>{this.props.object.Name}</a></UISref>
        </UISrefActive>
      </div>
    );
  }
  renderNormal(){
    return (
      <div className="col-xs-12">
        <div className="row">
          {this.state.object.Name}
        </div>
        <div className="row">
          {this.state.categories}
        </div>
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

export default Catalogue;
