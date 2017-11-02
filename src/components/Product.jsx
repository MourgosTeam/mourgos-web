import React, { Component } from 'react';
import './Product.css';

import { GetIt } from '../helpers/helpers.js'

import Attribute from './Attribute.jsx';

class Product extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;
    
    this.object = props.object;

    this.state = { 
      attributes : []
    };

    this.getAttributes();
  }


  getAttributes(){
    GetIt("/attributes/"+this.id , "GET")
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

  render() {
    return (
      <div className="Product">
          {this.state.attributes}
      </div>
    );
  }
}

export default Product;
