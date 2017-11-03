import React, { Component } from 'react';
import './Product.css';

import { GetIt, ImageCover } from '../helpers/helpers.jsx'

import Attribute from './Attribute.jsx';
import {Panel} from 'react-bootstrap'


function AddButton(props){
  return (
      <button className="btn btn-default add-button">Προσθήκη</button> 
    );
}

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


    this.openForEdit = this.openForEdit.bind(this);

    switch(this.mode){
      case 'minimal':
        if(!props.object)
        this.getMe();
        break;
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
    GetIt("/attributes/product/"+this.id , "GET")
    .then(function(data){
      return  data.json();
    })
    .then(function(data){
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

  openForEdit(){
      alert(this.id);
  }

  renderMinimal(){
    return (
      <div className="col-xs-12 col-md-6 col-lg-6 sm-pad">
        <Panel onClick={this.openForEdit} className="full-height">
          <div className="col-xs-8 text-left product-title-minimal">
            <span>{this.indexKey + 1}. {this.state.object.Name}</span>
          </div>
          <div className="col-xs-4 text-right product-price-minimal sm-pad">
            {/*<div>
              <AddButton></AddButton>
            </div> */}
            <div>
              <span className="text-muted">{this.state.object.Price} <span className="glyphicon glyphicon-euro"></span></span>
            </div>
          </div>
          <div className="col-xs-12 col-md-12 text-left">
            <div className="product-image-minimal">
              <ImageCover src={this.state.object.Image}/>
            </div>
            <div className="product-description-minimal">
              <span className="text-muted">{this.state.object.Description}</span>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  renderNormal(){
    return (
      <div className="row">
        <div className="col-xs-12">
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
