import React, { Component } from 'react';

import './CatalogueView.css';
import Catalogue from './Catalogue.jsx'
import Basket from './Basket.jsx'

import EditProduct from './EditProduct.jsx'

class CatalogueView extends Component {
  constructor(props){
    super(props);

    this.catalogueId = props.catalogue;

    this.state = {
      basketItems :  [{quantity : 2, description : [], name : "To kalutero beef tis agoras", price : 214.5}],
      showModal   : false,
      editItem    : {},
      editAttributes : [],
      basketTotal : 0
    }

    // TO - DO
    //this.loadFromStorage();
    this.addBasketItem = this.addBasketItem.bind(this);
    this.removeBasketItem = this.removeBasketItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openForEdit = this.openForEdit.bind(this);
  }

  addBasketItem(item, options, quantity){
    var newItem = {
      name : item.Name,
      description : options,
      price : item.Price,
      quantity : quantity
    };
    var sum = 0;
    for(var i=0; i < this.state.basketItems.length;i++)sum += parseFloat(this.state.basketItems[i].price * this.state.basketItems[i].quantity);
    
    sum += parseFloat(newItem.price);
    sum = sum.toFixed(2);
    this.setState(prevState => ({
      basketItems: [...prevState.basketItems, newItem],
      basketTotal: sum
    }));
  }

  removeBasketItem(item){
    var array = this.state.basketItems;
    var index = array.indexOf(item);
    array.splice(index, 1);
    
    console.log("REMOVING");
    console.log(item);
    var sum = this.state.basketTotal - (item.price * item.quantity);
    sum = sum.toFixed(2);
    this.setState({basketItems: array, basketTotal: sum });
  }

  closeModal(){
    this.setState({showModal:false});
  }
  openForEdit(item,attributes){
      this.setState({
        showModal : true,
        editItem  : item,
        editAttributes : attributes
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-8 col-lg-8">
            <Catalogue id={this.catalogueId} mode="normal" openForEdit={this.openForEdit}></Catalogue>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4">
            <Basket items={this.state.basketItems} total={this.state.basketTotal} onRemoveItem={this.removeBasketItem} editHandler={this.openForEdit}/>
          </div>
        </div>
        <EditProduct showModal={this.state.showModal} closeModal={this.closeModal} onSubmit={this.addBasketItem} object={this.state.editItem} attributes={this.state.editAttributes} ></EditProduct>
      </div>
    );
  }
}
export default CatalogueView;
