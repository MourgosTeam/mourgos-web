import React, { Component } from 'react';

import './CatalogueView.css';
import Catalogue from './Catalogue.jsx'
import Basket from './Basket.jsx'

import EditProduct from './EditProduct.jsx'

class CatalogueView extends Component {
  constructor(props){
    super(props);
    this.catalogueId = props.resolves.catalogue || props.catalogue;

    console.log(props);
    // TO - DO
    //this.loadFromStorage();
    this.state = {
      basketItems :  [],
      showModal   : false,
      editItem    : {},
      editAttributes : [],
      editQuantity: 1,
      basketTotal : 0,
      callback    : this.addBasketItem
    }
  }

  addBasketItem = ( item, description, quantity, prodAttributes ) => {
    var newItem = {
      object : item, 
      description : description,
      quantity : quantity,
      _attributes : prodAttributes
    };
    var sum = 0;
    for(var i=0; i < this.state.basketItems.length;i++)sum += parseFloat(this.state.basketItems[i].object.Price * this.state.basketItems[i].quantity);

    sum += parseFloat(newItem.object.Price*newItem.quantity);
    sum = sum.toFixed(2);
    this.setState(prevState => ({
      basketItems: [...prevState.basketItems, newItem],
      basketTotal: sum,
      showModal : false
    }));
  }
  editBasketItem = (item, description, quantity, prodAttributes) => {
    var arr = [...this.state.basketItems];
    var newArr = [];
    for(let i=0,l=arr.length,changed=-1; i < l ;i++){
      if(arr[i].object === item && arr[i]._attributes == prodAttributes){
        if(changed > -1){continue;
          newArr[changed].quantity += arr[i].quantity;
          continue;
        }
        arr[i].description = description;
        arr[i].quantity = quantity;
        arr[i]._attributes = prodAttributes;
        changed = i;
      }
      newArr.push(arr[i]);
    }

    var sum = 0;  
    for(var i=0; i < newArr.length;i++)sum += parseFloat(newArr[i].object.Price * newArr[i].quantity);
    sum = sum.toFixed(2);
    this.setState(prevState => ({
      basketItems: newArr,
      basketTotal: sum,
      showModal : false
    })); 
    return;
  }

  removeBasketItem = (item) => {
    var array = this.state.basketItems;
    var index = array.indexOf(item);
    if(index > -1)
      array.splice(index, 1);
    var sum = this.state.basketTotal - (item.object.Price * item.quantity).toFixed(2);
    sum = sum.toFixed(2);
    this.setState({basketItems: array, basketTotal: sum });
  }

  closeModal = () => {
    this.setState({showModal:false});
  }
  openForEdit = (item,quantity,attributes) => {
    var newItem = Object.assign({},item);
    this.setState({
      showModal : true,
      editItem  : newItem,
      editAttributes : attributes,
      modalButtonText : "Αλλαγή",
      editQuantity : quantity || 1,
      callback  : this.editBasketItem
    });
  }
  openForAdd = (item,attributes) => {
    var newItem = Object.assign({},item);
    this.setState({
      showModal : true,
      editItem  : newItem,
      editQuantity : 1,
      editAttributes : attributes,
      modalButtonText : "Προσθήκη",
      callback  : this.addBasketItem
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-8 col-lg-8">
            <Catalogue id={this.catalogueId} mode="normal" openForAdd={this.openForAdd}></Catalogue>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4">
            {console.log(this.state.editItem)}
            <Basket items={this.state.basketItems} total={this.state.basketTotal} onRemoveItem={this.removeBasketItem} onEditItem={this.openForEdit}/>
          </div>
        </div>
        {this.state.showModal ?
          <EditProduct showModal={this.state.showModal} quantity={this.state.editQuantity} buttonText={this.state.modalButtonText}
                       closeModal={this.closeModal} onSubmit={this.state.callback} object={this.state.editItem} attributes={this.state.editAttributes}></EditProduct>
          : ""}
      </div>
    );
  }
}
export default CatalogueView;
