import React, { Component } from 'react';
import './Basket.css';



// import { GetIt, ImageCover } from '../helpers/helpers.jsx'

// import Attribute from './Attribute.jsx';
import {Button} from 'react-bootstrap'


class BasketItem extends Component{
  constructor(props){
    super(props);

    this.editHandler = () => props.editHandler(props.item.object, props.item.quantity, props.item._attributes, props.item._selectedAttributes);
    this.removeHandler = () => props.removeHandler(props.item);
  }
  render(){
    return (<div className="row basket-item">
      <span className="description col-xs-12 col-sm-8 col-md-8 text-left">{this.props.item.quantity}x {this.props.item.object.Name}</span>
      <span className="price col-xs-12 col-sm-4 col-md-4 text-right">{(this.props.item.object.Price * this.props.item.quantity).toFixed(2)} EUR</span>
      <span className="col-xs-8 text-left"> 
        {this.props.item.description.map((data, index) => {return <div className="basket-item-description" key={index}>{data}</div>})}
      </span>
      <span className="col-xs-4 text-right basket-buttons"><span className="glyphicon glyphicon-edit" onClick={this.editHandler}></span><span className="glyphicon glyphicon-remove" onClick={this.removeHandler}></span></span>
    </div>);
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
      top : 0
    }
  }

  onScroll = (e) => {
    var m = window.scrollY;
    var value = m > 100;
    this.setState({
      fixed : value,
      top : m-100
    });
  }

  componentDidMount(){
    //window.addEventListener('scroll',this.onScroll);
  }
  componentWillUnmount(){
    //window.removeEventListener('scroll',this.onScroll);
  }
  render() {
    return (<div className={ "row basket " + ((this.state.fixed) ? "basket-fixed" : "") } style={ (this.state.fixed) ? {top:this.state.top} : {}}>
      <div className="col-xs-12 title text-center">Το Καλαθι μου</div>
        <div className="col-xs-12 basket-panel">
        {this.props.items.map(function(data,index){
          return <BasketItem key={(index+1)*Math.floor(Math.random()*1000000)} item={data} removeHandler={this.removeBasketItem} editHandler={this.editBasketItem}></BasketItem>
        }.bind(this))}

        {
          (this.props.items.length)?(
              <div className="basket-total-panel text-right">
                  <div className="basket-total">ΣΥΝΟΛΟ: {this.props.total}</div>
                  <div className="row">
                    <span className="col-xs-5 basket-clear-button" onClick={this.clear}>Καθαρισμα</span>
                    <div className="col-xs-1"></div>
                    <Button className="col-xs-5 basket-add-button">Παραγγελια</Button>
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
