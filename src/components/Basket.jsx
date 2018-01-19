import React, { Component } from 'react';
import './Basket.css';

import EditProduct from './EditProduct.jsx'
import CheckoutModal from './CheckoutModal.jsx'

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
        <b className="basket-catalogue-name"><a href={"/" + this.props.catalogue.FriendlyURL + "/"}>{this.props.catalogue.Name || ""}</a></b><br />
        {this.props.data.items.map((data,index) => 
        <BasketItem key={(index+1)*Math.floor(Math.random()*1000000)} item={data} 
                    removeHandler={this.props.removeHandler} editHandler={this.props.editHandler}></BasketItem>
        )}
        <div className="part-price">
          <span>Μερικό Σύνολο: {this.props.data.items.reduce((a,b) => a+b.TotalPrice, 0).toFixed(2)}<span className="fa fa-euro"></span></span>
        </div>
      </div>
    );
  }
}
function CalculatePrice(item){
  var fprice = parseFloat(item.object.Price);
  for(var i=0; i < item._selectedAttributes.length;i++){
    if(item._selectedAttributes[i] > -1){
      fprice += isNaN(item._attributes[i].Price) ? JSON.parse(item._attributes[i].Price)[item._selectedAttributes[i]] : parseFloat(item._attributes[i].Price);
    }
  }
  item.TotalPrice =  parseFloat(fprice)*parseInt(item.quantity,10);
  return item.TotalPrice;
}
class Basket extends Component {
  constructor(props){
    super(props);
    this.state = {
      fixed : 0,
      top : 0,
      data: JSON.parse(localStorage.getItem("localbasket")) || [],
      total: parseFloat(localStorage.getItem("localbaskettotal")) || 0,
      catalogues: JSON.parse(sessionStorage.getItem("catalogues")) || {},

      showEditModal   : false,
      editModalOptions: {
        editItem    : {},
        editAttributes : [],
        selectedAttributes: [],
        editQuantity: 1,
        editComments: "",
        callback    : this.addBasketItem
      }
    };
    if(!sessionStorage.getItem("catalogues")) {
      this.loadCatalogues();
    }
  }


  componentDidUpdate() {
    this.updateBasketTotal();
    this.save();
  }


  load(){
    this.setState({
      data: JSON.parse(localStorage.getItem("localbasket")) || [],
      total: parseFloat(localStorage.getItem("localbaskettotal") || 0)
    });
  }
  save(){
    localStorage.setItem('localbasket', JSON.stringify(this.state.data));
    localStorage.setItem('localbaskettotal', this.state.total);
  }
  
  loadCatalogues = () => {
     GetIt("/catalogues/" , "GET")
    .then(function(data) {
      return data.json();
    })
    .then((data) => {
      return data.reduce(function(a, b){
        a[b.id] = b;
        return a;
      }, {});
    })
    .then(
     (data) => {
        sessionStorage.setItem("catalogues", JSON.stringify(data));
        this.setState({catalogues : data});
      }
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

  updateBasketTotal = () => {
    let shops = this.state.data;
    let total = 0;
    for (let i = 0; i < shops.length; i++) {
      total += shops[i].total;
    }
    if(total!==this.state.total)
      this.setState({
        total: total
      });
    return total;
  }


  getShopBasket = (id) => {
    for (let i = 0; i < this.state.data.length;i += 1 ) {
      if (this.state.data[i].catalogue === id) return this.state.data[i];
    }
    return false;
  } 

  createShopBasket = (id) => {
    let newBasket = {
      catalogue: id,
      items: [],
      total: 0
    };
    this.setState({
      data: [
        ...this.state.data,
        newBasket
      ]
    });
    return newBasket;
  }

  checkOrCreateBasket = (id) => {
    const shop = this.getShopBasket(id);
    if (!shop) {
      return this.createShopBasket(id);
    }
    return shop;
  }

  addItemToBasket(item, basket) {
    basket.items.push(item);
    var sum = 0;
    for(var i=0; i < basket.items.length;i++)
      sum += CalculatePrice(basket.items[i]);
    basket.total = sum;
  }

  addBasketItem = (item, description, quantity, prodAttributes, selectedAttributes, comments ) => {
    let basket = this.checkOrCreateBasket(item.CatalogueID);

    var copiedItem = Object.assign({},item);
    copiedItem.__randID = Math.random();
    var newItem = {
      CatalogueID: item.CatalogueID,
      object : copiedItem, 
      description : description,
      quantity : quantity,
      _attributes : prodAttributes,
      _selectedAttributes : selectedAttributes,
      comments : comments
    };
    
    this.addItemToBasket(newItem, basket);
    
    //close Modal
    this.setState({
      showEditModal: false
    });
    this.forceUpdate();
  }
  editBasketItem = (item, description, quantity, prodAttributes, selectedAttributes, comments) => {
    let basket = this.checkOrCreateBasket(item.CatalogueID);
    var arr = [...basket.items];
    var newArr = [];
    for(let i=0,l=arr.length; i < l ;i++){
      if(arr[i].object === item){
        arr[i].description = description;
        arr[i].quantity = quantity;
        arr[i]._attributes = prodAttributes;
        arr[i]._selectedAttributes = selectedAttributes;
        arr[i].comments = comments;
      }      
      newArr.push(arr[i]);
    }
    
    basket.items = newArr;
    var sum = 0;  
    for(var i=0; i < newArr.length;i++)sum += CalculatePrice(newArr[i]);
    basket.total = sum;

    this.setState({
      showEditModal : false
    }); 
    this.forceUpdate();
    return;
  }

  removeBasketItem = (item) => {
    let basket = this.checkOrCreateBasket(item.CatalogueID);
    var index = basket.items.indexOf(item);
    if(index > -1)
      basket.items.splice(index, 1);

    var sum = 0;
    for(var i=0; i < basket.items.length;i++)
      sum += CalculatePrice(basket.items[i]);
    basket.total = sum;

    if (basket.items.length === 0) {
      var dex = this.state.data.indexOf(basket);
      this.state.data.splice(dex,1);
    }
    this.forceUpdate();
  }

  closeModal = () => {
    this.setState({showEditModal:false});
  }
  closeCheckoutModal = () => {
    this.setState({showCheckoutModal:false});
  }
  checkout = () => {
    // check total! 
    if(this.state.total < parseFloat(window.GlobalData.MinimumOrder) ){
      this.setState({
        showCheckoutModal : true
      });
    }
    else{
      this.props.onCheckout();
    }
  }

  openForEdit = (item,quantity,attributes, selectedAttributes, comments) => {
    this.setState({
      showEditModal : true,
      editModalOptions: {
        ...this.state.editModalOptions,
        editItem  : item,
        editAttributes : attributes,
        selectedAttributes : selectedAttributes,
        modalButtonText : "Αλλαγή",
        editQuantity : quantity || 1,
        editComments : comments,
        callback  : this.editBasketItem
      }
    });
  }
  addItem = (item,attributes) => {
    this.setState({
      showEditModal : true,
      editModalOptions: {
        ...this.state.editModalOptions,
        editItem  : item,
        editQuantity : 1,
        editComments : "",
        editAttributes : attributes,
        selectedAttributes: [],
        modalButtonText : "Προσθήκη",
        callback  : this.addBasketItem
      }
    });
  }
  
  clear = () => {
    this.setState({
      data: [],
      total: 0
    })
  }

  render() {
    return (
    <div className={ "row basket " + ((this.state.fixed) ? "basket-fixed" : "") } style={ (this.state.fixed) ? {top:this.state.top} : {}}>  
      <div className="col-12 basket-panel">
        <div className="col-12 title text-center">Το Καλαθι μου</div>
        {this.state.data.map((data, index) => {
          return <CatalogueBasket data={data || {}} key={index} catalogue={this.state.catalogues[data.catalogue] || {}}
                                  removeHandler={this.removeBasketItem} editHandler={this.openForEdit}/>
        })}
        {
          (this.state.data.length)?(
              <div className="basket-total-panel text-right">
                  <div className="basket-total">ΣΥΝΟΛΟ: {this.state.total.toFixed(2)}<span className="fa fa-euro"></span></div>
                  <div className="row">
                    <button className="col-12 col-md-5 basket-clear-button m-auto btn btn-link" onClick={this.clear}>Καθαρισμα</button>
                    <Button className="col-12 col-md-6 col-sm-7 basket-add-button m-auto" onClick={this.checkout}>Παραγγελια</Button>
                  </div>
              </div>):
          (
              <div className="basket-noproducts">
                Κανένα προϊόν
              </div>
          )
        }
      </div>
      <EditProduct showModal={this.state.showEditModal} quantity={this.state.editModalOptions.editQuantity}
                   comments={this.state.editModalOptions.editComments} buttonText={this.state.editModalOptions.modalButtonText}
                   closeModal={this.closeModal} onSubmit={this.state.editModalOptions.callback} 
                   object={this.state.editModalOptions.editItem} attributes={this.state.editModalOptions.editAttributes}
                   selectedAttributes={this.state.editModalOptions.selectedAttributes} />
      <CheckoutModal showModal={this.state.showCheckoutModal} closeModal={this.closeCheckoutModal} onCheckoutNow={this.props.onCheckout}></CheckoutModal>
    </div>);
  }
}
export default Basket;
