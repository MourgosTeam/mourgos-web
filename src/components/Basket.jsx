import React, { Component } from 'react';
import './Basket.css';

// import { GetIt, ImageCover } from '../helpers/helpers.jsx'

// import Attribute from './Attribute.jsx';
// import {Panel} from 'react-bootstrap'


class BasketItem extends Component{
  constructor(props){
    super(props);

    this.editHandler = () => props.editHandler(props.item);
    this.removeHandler = () => props.removeHandler(props.item);
  }
  render(){
    return (<div className="row basket-item">
      <span className="description col-xs-12 col-sm-8 col-md-8 text-left">{this.props.item.quantity}x {this.props.item.name}</span>
      <span className="price col-xs-12 col-sm-4 col-md-4 text-right">{(this.props.item.price * this.props.item.quantity).toFixed(2)} EUR</span>
      <span className="col-xs-9 text-left"> 
        {this.props.item.description.map((data, index) => {return <div className="basket-item-description" key={index}>{data}</div>})}
      </span>
      <span className="col-xs-3 text-right"><span className="glyphicon glyphicon-edit" onClick={this.editHandler}></span><span className="glyphicon glyphicon-remove" onClick={this.removeHandler}></span></span>
    </div>);
  }
}

class Basket extends Component {
  constructor(props){
    super(props);

    this.removeBasketItem = props.onRemoveItem;
    this.editBasketItem = props.onRemoveItem;
  }

  render() {
    return (<div className="row basket">
      <div className="col-xs-12 title text-center">Το Καλάθι μου</div>
      <div className="col-xs-12 basket-panel">
        {this.props.items.map(function(data,index){
          return <BasketItem key={(index+1)*Math.floor(Math.random()*1000000)} item={data} removeHandler={this.removeBasketItem} editHandler={this.editBasketItem}></BasketItem>
        }.bind(this))}

        <div className="basket-subtotal">
          ΣΥΝΟΛΟ: {this.props.total}
        </div>
      </div>
    </div>);
  }
}
export default Basket;
