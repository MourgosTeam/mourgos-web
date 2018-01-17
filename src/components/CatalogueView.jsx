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
      fprice += isNaN(item._attributes[i].Price) ? JSON.parse(item._attributes[i].Price)[item._selectedAttributes[i]] : parseFloat(item._attributes[i].Price);
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
    localStorage.removeItem("lastresort");
    if(!localStorage.getItem("user_address")){
      localStorage.setItem("lastresort", this.catalogue.FriendlyURL);
      this.redirect("home");
    }

  }

  openForAdd = (item,attributes) => {
    console.log("Opening for add...");
    item.CatalogueID = this.catalogue.id;
    this.basket.addItem(item,attributes);
  }

  checkout = () => {
    this.redirect("checkout");
  }
  
  render() {
    return (
      <div className="container catalogue-view">
        <div className="row">
          <div className="col-12 col-sm-7 col-md-8 col-lg-9">
            <i className="fa fa-arrow-left back-icon" aria-hidden="true" onClick={() => this.redirect("allcatalogues")}></i>
            <Catalogue id={this.catalogue.id} mode="normal" object={this.catalogue} openForAdd={this.openForAdd}></Catalogue>
          </div>
          <div className="col-12 col-sm-5 col-md-4 col-lg-3">
            <Basket ref={instance => { this.basket = instance; }} auto={true} onCheckout={this.checkout}/>
          </div>
        </div>
      </div>
    );
  }
}
//const CatalogueViewEx = withRouter(props => <CatalogueView {...props}/>);
export default CatalogueView;
