import React, { Component } from 'react';
import './Basket.css';

import { GetIt, ImageCover } from '../helpers/helpers.jsx'

import Attribute from './Attribute.jsx';
import {Panel} from 'react-bootstrap'


class BasketItem extends Component{
  constructor(props){
    super(props);

    this.editHandler = () => props.editHandler(props.item);
    this.removeHandler = () => props.removeHandler(props.item);
    this.state = {
      item : props.item
    };
  }
  render(){
    return (<div className="basket-item">
      <span className="description col-xs-12 col-sm-8 col-md-8 text-left">{this.state.item.quantity}x {this.state.item.description}</span>
      <span className="price col-xs-12 col-sm-4 col-md-4 text-right">{this.state.item.price * this.state.item.quantity} EUR</span>
      <span className="col-xs-12 text-right"><span className="glyphicon glyphicon-edit" onClick={this.editHandler}></span><span className="glyphicon glyphicon-remove" onClick={this.removeHandler}></span></span>
    </div>);
  }
}

class Basket extends Component {
  constructor(props){
    super(props);
    
    this.state = { 
      items : props.items,
      object : props.object || {}
    };

    this.removeBasketItem = props.onRemoveItem;
    this.editBasketItem = props.onRemoveItem;
  }

  

  render() {
    var self = this;
    return (<div className="basket">
      <div className="col-xs-12 title text-center">Το Καλάθι μου</div>
      <div className="col-xs-12 basket-panel">
        {this.state.items.map(function(data,index){
          return <BasketItem key={index} item={data} removeHandler={this.removeBasketItem} editHandler={this.editBasketItem}></BasketItem>
        }.bind(this))}
      </div>
    </div>);
  }

}

export default Basket;
