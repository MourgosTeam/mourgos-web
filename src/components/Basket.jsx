import React, { Component } from 'react';
import './Basket.css';



import { GetIt } from '../helpers/helpers.jsx'

// import Attribute from './Attribute.jsx';
import {Button} from 'react-bootstrap'


class BasketItem extends Component{
  constructor(props){
    super(props);

    this.editHandler = () => props.editHandler(props.item.object, props.item.quantity, props.item._attributes, props.item._selectedAttributes, props.item.comments);
    this.removeHandler = () => props.removeHandler(props.item);
  }
  render(){
    return (<div className="row basket-item">
      <span className="description col-8 col-sm-8 col-md-8 text-left">{this.props.item.quantity}x {this.props.item.object.Name}</span>
      <span className="price col-4 col-sm-4 col-md-4 text-right">{this.props.item.TotalPrice.toFixed(2)} 
        <span className="fa fa-euro"></span>        
      </span>
      <div className="col text-left"> 
        { this.props.item.description.map((data, index) => {return <div className="basket-item-description" key={index}>{data}</div>})}
      </div>
      <span className="col-4 text-right basket-buttons"><span className="fa fa-pencil-square-o" onClick={this.editHandler}></span><span className="fa fa-times" onClick={this.removeHandler}></span></span>
    </div>);
  }
}

class CatalogueBasket extends Component {
  render() {
    if(!('items' in this.props.data))return false;
    return (
      <div>
        {this.props.data.items.map((data,index) => 
        <BasketItem key={(index+1)*Math.floor(Math.random()*1000000)} item={data} removeHandler={this.removeBasketItem} editHandler={this.editBasketItem}></BasketItem>
        )}
      </div>
    );
  }
}

class Basket extends Component {
  constructor(props){
    super(props);
    this.removeBasketItem = props.onRemoveItem;
    this.editBasketItem = props.onEditItem;
    this.clear = props.onClear;
    this.state = {
      fixed : 0,
      top : 0,
      data: [],
      catalogues: {}
    };
    this.loadCatalogues();
  }

  loadCatalogues = () => {
     GetIt("/catalogues/" , "GET")
    .then(function(data){
      return data.json();
    })
    .then((data) => {
      return data.reduce(function(a, b){
        a[b.id] = b;
        return a;
      }, {});
    })
    .then(
     (data) => { this.setState({catalogues : data}) }
    );
  }

  onScroll = (e) => {
    var m = window.scrollY;
    var value = m > 100;
    this.setState({
      fixed : value,
      top : m-100
    });
  }

  render() {
    return (
    <div className={ "row basket " + ((this.state.fixed) ? "basket-fixed" : "") } style={ (this.state.fixed) ? {top:this.state.top} : {}}>  
      <div className="col-12 basket-panel">
        <div className="col-12 title text-center">Το Καλαθι μου</div>
        <CatalogueBasket data={this.state.data[0] || {}} />
        {
          (this.state.data.length)?(
              <div className="basket-total-panel text-right">
                  <div className="basket-total">ΣΥΝΟΛΟ: {this.props.total.toFixed(2)}<span className="fa fa-euro"></span></div>
                  <div className="row">
                    <button className="col-12 col-md-5 basket-clear-button m-auto btn btn-link" onClick={this.clear}>Καθαρισμα</button>
                    <Button className="col-12 col-md-6 col-sm-7 basket-add-button m-auto" onClick={this.props.onCheckout}>Παραγγελια</Button>
                  </div>
              </div>):
          (
              <div className="basket-noproducts">
                Κανένα προϊόν
              </div>
          )
        }
      </div>
    </div>);
  }
}
export default Basket;
