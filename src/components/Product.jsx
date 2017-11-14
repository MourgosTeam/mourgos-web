import React, { Component } from 'react';
import './Product.css';

import { GetIt, BackgroundGradientImage } from '../helpers/helpers.jsx'

import Attribute from './Attribute.jsx';
import {Panel} from 'react-bootstrap'


// function AddButton(props){
//   return (
//       <button className="btn btn-default add-button">Προσθήκη</button> 
//     );
// }

class Product extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;
    
    this.indexKey = props.indexKey;

    this.state = { 
      attributes : [],
      object : props.object || {}
    };

    this.mode = props.mode || "minimal";

    this.editFn = props.openForAdd;
    this.attributes = [];

    this.openForAdd = () => this.editFn(this.state.object, this.attributes);

    switch(this.mode){
      case 'minimal':
        if(!props.object)
        this.getMe();
        break;
      default:
      case 'normal':
        this.getAttributes();
        break;
    }
  }


  getMe(){
    GetIt("/products/"+this.id , "GET")
    .then(function(data){
      return data.json();
    })
    .then( (data) => this.setState({ object : data }));
  }


  getAttributes(){
    var self = this;
    GetIt("/attributes/product/"+this.id , "GET")
    .then(function(data){
      return  data.json();
    })
    .then(function(data){
      self.attributes = data;
      return data.map(function(object, index){
        return  (<div key={index}>
                    <h2>{object.Name}</h2>
                    <Attribute id={object.id} object={object}></Attribute>
                  </div>); 
      });
    })
    .then(
      (data) => this.setState({attributes : data})
    );
  }


  renderNormal(){
    return (
      <div className="col-12 col-md-6 col-lg-4 sm-pad-all ">
        <Panel onClick={this.openForAdd} className="pointer product-panel" style={BackgroundGradientImage(this.state.object.Image)}>
          <div className="row nm sm-pad-top">
            <div className="col-8 text-left product-title-minimal">
              <span>{this.state.object.Name}</span>
            </div>
            <div className="col-4 text-right product-price-minimal">
              {/*<div>
                <AddButton></AddButton>
              </div> */}
              <div>
                <span>{this.state.object.Price} <span className="glyphicon glyphicon-euro"></span></span>
              </div>
            </div>
            <div className="col-12 col-md-12 text-left">
                <div className="product-description-minimal">
                <span>{this.state.object.Description}</span>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  renderMinimal(){
    return (
      <div className="row">
        <div className="col-12">
          {this.state.attributes}
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

export default Product;
