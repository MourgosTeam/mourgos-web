import React, { Component } from 'react';

import './CatalogueView.css';
import Catalogue from './Catalogue.jsx'
import Basket from './Basket.jsx'

import EditProduct from './EditProduct.jsx'
import CheckoutModal from './CheckoutModal.jsx'

function CalculatePrice(item){
  var fprice = parseFloat(item.object.Price);
  for(var i=0; i < item._selectedAttributes.length;i++){
    if(item._selectedAttributes[i] > -1){
      fprice += parseFloat(item._attributes[i].Price);
    }
  }
  item.TotalPrice =  parseFloat(fprice)*parseInt(item.quantity,10);
  return item.TotalPrice;
}

class CatalogueView extends Component {

  constructor(props){
    super(props);
    this.redirect = props.transition.router.stateService.go;
    this.catalogue = props.resolves.catalogue || props.catalogue;
    // TO - DO
    //this.loadFromStorage();
    var local = this.loadFromStorage();
    this.state = {
      basketItems :  local.items,
      showModal   : false,
      editItem    : {},
      editAttributes : [],
      selectedAttributes: [],
      editQuantity: 1,
      basketTotal : local.total,
      callback    : this.addBasketItem
    };
    
  }
  loadFromStorage(){
    var local = JSON.parse(localStorage.getItem('basket'));
    if(!local){
      local = {
        items : [],
        total : 0,
        id : -1
      } 
    }
    if(local.id !== this.catalogue.id){
      localStorage.setItem('basket', null);
      local.items = [];
      local.total = 0;
      local.id = -1;
    }
    return local;
  }
  componentDidUpdate(){
    if(this.saveBasketFlag){
      var a = {id: this.catalogue.id, items: this.state.basketItems, total: this.state.basketTotal};
      localStorage.setItem("basket", JSON.stringify(a));
      this.saveBasketFlag = false;
    }
  }

  addBasketItem = ( item, description, quantity, prodAttributes, selectedAttributes ) => {
    this.saveBasketFlag = true;
    var copiedItem = Object.assign({},item);
    copiedItem.__randID = Math.random();
    var newItem = {
      object : copiedItem, 
      description : description,
      quantity : quantity,
      _attributes : prodAttributes,
      _selectedAttributes : selectedAttributes
    };
    var sum = 0;
    for(var i=0; i < this.state.basketItems.length;i++)sum += CalculatePrice(this.state.basketItems[i])
    sum += CalculatePrice(newItem);
    this.setState(prevState => ({
      basketItems: [...prevState.basketItems, newItem],
      basketTotal: sum,
      showModal : false
    }));
  }
  editBasketItem = (item, description, quantity, prodAttributes, selectedAttributes) => {
    this.saveBasketFlag = true;
    var arr = [...this.state.basketItems];
    var newArr = [];
    for(let i=0,l=arr.length; i < l ;i++){
      if(arr[i].object === item){
        arr[i].description = description;
        arr[i].quantity = quantity;
        arr[i]._attributes = prodAttributes;
        arr[i]._selectedAttributes = selectedAttributes;
      }      
      newArr.push(arr[i]);
    }

    var sum = 0;  
    for(var i=0; i < newArr.length;i++)sum += CalculatePrice(newArr[i]);
    this.setState(prevState => ({
      basketItems: newArr,
      basketTotal: sum,
      showModal : false
    })); 
    return;
  }

  removeBasketItem = (item) => {
    this.saveBasketFlag = true;
    var array = this.state.basketItems;
    var index = array.indexOf(item);
    if(index > -1)
      array.splice(index, 1);
    var sum = this.state.basketTotal - CalculatePrice(item);
    this.setState({basketItems: array, basketTotal: sum });
  }

  closeModal = () => {
    this.setState({showModal:false});
  }
  closeCheckoutModal = () => {
    this.setState({showCheckoutModal:false});
  }
  openForEdit = (item,quantity,attributes, selectedAttributes) => {
    this.setState({
      showModal : true,
      editItem  : item,
      editAttributes : attributes,
      selectedAttributes : selectedAttributes,
      modalButtonText : "Αλλαγή",
      editQuantity : quantity || 1,
      callback  : this.editBasketItem
    });
  }
  openForAdd = (item,attributes) => {
    this.setState({
      showModal : true,
      editItem  : item,
      editQuantity : 1,
      editAttributes : attributes,
      selectedAttributes: [],
      modalButtonText : "Προσθήκη",
      callback  : this.addBasketItem
    });
  }
  clearBasket = () => {
    this.setState({
      basketItems: []
    });
  }

  checkout = () => {
    // check total! 
    if(this.state.basketTotal < 5){
      this.setState({
        showCheckoutModal : true
      });
    }
    else{
      this.redirect("checkout");
    }
    // if total < minimum_order
    //   showModal
    // else
    //   redirect
  }

  checkoutNow = () => {
    // check total! 
    this.redirect("checkout");
  }

  render() {
    return (
      <div className="container catalogue-view">
        <div className="row">
          <div className="col-12 col-sm-7 col-md-8 col-lg-9">
            <Catalogue id={this.catalogue.id} mode="normal" object={this.catalogue} openForAdd={this.openForAdd}></Catalogue>
          </div>
          <div className="col-12 col-sm-5 col-md-4 col-lg-3">
            <Basket items={this.state.basketItems} total={this.state.basketTotal} 
                    onRemoveItem={this.removeBasketItem} onEditItem={this.openForEdit} onClear={this.clearBasket} onCheckout={this.checkout}/>
          </div>
        </div>
        {this.state.showModal ?
        <EditProduct showModal={this.state.showModal} quantity={this.state.editQuantity} buttonText={this.state.modalButtonText}
                     closeModal={this.closeModal} onSubmit={this.state.callback} 
                     object={this.state.editItem} attributes={this.state.editAttributes}
                     selectedAttributes={this.state.selectedAttributes}></EditProduct>
        : ""}
        {this.state.showCheckoutModal ?
        <CheckoutModal showModal={this.state.showCheckoutModal} closeModal={this.closeCheckoutModal} onCheckoutNow={this.checkoutNow}></CheckoutModal>
        : ""}
      </div>
    );
  }
}
//const CatalogueViewEx = withRouter(props => <CatalogueView {...props}/>);
export default CatalogueView;
