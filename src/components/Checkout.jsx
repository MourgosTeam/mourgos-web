import React, { Component } from 'react';

import './Checkout.css';
// import {UISref, UISrefActive} from '@uirouter/react';

import Constants from '../helpers/constants';

import { Card,  CardBody, CardTitle } from 'reactstrap';

import {GetIt} from '../helpers/helpers'



export class CheckoutBasketItem extends Component{
  render(){
    return (<div className="row basket-item">
      <span className="description col-12 col-sm-8 col-md-8 text-left">{this.props.item.quantity}x {this.props.item.object.Name}</span>
      <span className="price col-12 col-sm-4 col-md-4 text-right">{this.props.item.TotalPrice.toFixed(2)} 
        <span className="fa fa-euro"></span> 
      </span>
      <div className="col-8 text-left"> 
        {this.props.item.description.map((data, index) => {return <div className="basket-item-description" key={index}>{data}</div>})}
        {this.props.item.comments ? 
          ("Σχόλια :" + this.props.item.comments): ""}
      </div>
    </div>);
  }
}


class Checkout extends Component {
  
  constructor(props){
    super(props);
    this.redirect = props.transition.router.stateService.go;

    // Get Basket from local storage!
    var local = JSON.parse(localStorage.getItem('localbasket'));
    var localtotal = parseFloat(localStorage.getItem('localbaskettotal'));
    if(!local){
      local = {
        items : []
      };
      this.redirect("allcatalogues");
    }
    // Get userData from local storage
    var localData = JSON.parse(localStorage.getItem("user_data"));
    if(!localData)localData = {};

    // check if this basket needs extra Charge
    var hasExtra = parseFloat(localtotal) < parseFloat(window.GlobalData.MinimumOrder);

    // init state
    this.state = {
      name    : localData.name || "",
      koudouni: localData.koudouni || "",
      address : localStorage.getItem("formatted_address"),
      orofos  : localData.orofos || "",
      phone   : localData.phone || "",
      comments: localData.comments || "",
      baskets : local,
      total : localtotal,
      diffName : localData.diffName || false,
      extraCharge : hasExtra,
      catalogue : local.catalogue,
      coupon : '',
      formula: 0,
      hashtag: '',
      catalogues: {}
    }
    let place =  JSON.parse(localStorage.getItem('place'));
    if(!place)alert("Υπάρχει κάποιο πρόβλημα! Παρακάλω μεταφερθείτε στην αρχική σελίδα και διαλέξτε διεύθυνση!");
    this.latitude  = place.geometry.location.lat;
    this.longitude = place.geometry.location.lng;
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
  componentWillUpdate(){
    let place =  JSON.parse(localStorage.getItem('place'));
    if(!place)alert("Υπάρχει κάποιο πρόβλημα! Παρακάλω μεταφερθείτε στην αρχική σελίδα και διαλέξτε διεύθυνση!");
    this.latitude  = place.geometry.location.lat;
    this.longitude = place.geometry.location.lng;
  }

  checkForExtra(items){
    if(!items)return true;
    for(var i = 0; i < items.length; i++){

    }
  }
  componentDidUpdate(){
    var storage = {
      name : this.state.name,
      koudouni: this.state.koudouni,
      orofos  : this.state.orofos,
      phone   : this.state.phone,
      comments: this.state.comments,
      diffName: this.state.diffName
    };
    localStorage.setItem("user_data", JSON.stringify(storage));
  }

  handleChange = (e) => {
    var target = e.target;
    this.setState({
      [target.id]: target.value
    });
  }

  handleCoupon = () => {
    const coupon = this.state.coupon.split('#').join('');
    if (coupon.length < 3) {
      document.getElementById('coupon').classList.remove('required');
      return;
    }
    GetIt('/campaigns/'+coupon+'/', 'GET').then((data) => data.json())
    .then((data) => {
      if(data.code){
        throw data.code;
      }
      document.getElementById('coupon').disabled = true;
      document.getElementById('coupon').classList.add('success');
      document.getElementById('couponbutton').disabled = true;

      let formula = data.Formula;
      if (parseInt(formula, 10) === 100) {
        formula = (formula - 100) * (this.state.basketTotal + this.state.extraCharge * Constants.extraCharge);
      }
      this.setState({
        formula: formula,
        hashtag: coupon
      });
    }).catch((err) => {
      if(err === 'No more'){
        alert('Άργησες! Το κουπόνι έχει ήδη χρησιμοποιηθεί αρκετές φορές.');
        document.getElementById('coupon').value = '';
        document.getElementById('coupon').classList.remove('required');
      }
      else{
        document.getElementById('coupon').classList.add('required');
      }
    });
  }

  toggle = (e) =>{
    var t = e.target;
    this.setState((prev) => ({
      [t.id] : t.checked
    }));
  }


  calculateAttributes(a,s){
    var r = {};
    for(var i in s){
      if(s[i] === null || (!s[i] && s[i] !== 0) || s[i] === -1)continue;
      r[a[i].id] = s[i];
    }
    return r;
  }
  // SEND ORDER // 
  sendOrder = () => {
    if(!this.checkFields())return;
    let items = [...this.state.basketItems];
    let nitems = [];
    for(var i=0; i < items.length; i = i + 1){
      var newItem = {
          id      : items[i].object.id,
          quantity: items[i].quantity,
          comments: items[i].comments,
          TotalPrice : items[i].TotalPrice,
          attributes: this.calculateAttributes(items[i]._attributes,items[i]._selectedAttributes)
      };
      nitems.push(newItem);
    }
    let order = {
      name : this.state.name,
      email : this.state.email,
      koudouni: this.state.koudouni,
      orofos  : this.state.orofos,
      phone   : this.state.phone,
      address   : this.state.address,
      comments: this.state.comments,
      basketItems : nitems, 
      basketTotal : this.state.basketTotal,
      hasExtra    : this.state.extraCharge,
      catalogue   : this.state.catalogue,
      latitude : this.latitude,
      longitude: this.longitude,
      coupon : this.state.coupon,
      hashtag: this.state.hashtag
    };
    GetIt("/orders" , "POST", order)
    .then(function(data){
      return data.json();
    })
    .then((data) => {
      this.redirect("foodiscoming", { orderId : data.id });
      return true;
    })
    .catch((err) => {
      this.checkFields();
      if (err.status === 503) {
        alert('Δεν μπορείς να κάνεις παραγγελίες όσο ο Μούργος είναι κλειστός!');
      }
    });
  }
  checkFields(){
    var reqs = ['name', 'address','orofos','phone'];
    var flag = true;
    for(var i in reqs){
      if(document.getElementById(reqs[i]).value.length < 1){
        document.getElementById(reqs[i]).classList.add('required');
        flag = false;
      }
      else document.getElementById(reqs[i]).classList.remove('required');
    }
    return flag;
  }


  render = () => {
    return (
      <div className="container checkout">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5">
            <Card>
              <CardBody>
                <CardTitle>Τα στοιχεία μου</CardTitle>
                <div className="pad-top">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Όνομα*</label>
                      <input type="text" className="form-control" id="name" placeholder="Όνομα" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email*</label>
                      <input type="text" className="form-control" id="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" id="diffName" checked={this.state.diffName} onChange={this.toggle}/>
                        Έχω άλλο όνομα στο κουδούνι
                      </label>
                    </div>
                    <div className={"form-group " + ((this.state.diffName)? "d-block":"d-none")} >
                      <input type="text" className="form-control" id="koudouni" placeholder="Όνομα στο κουδούνι" value={this.state.koudouni} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Διεύθυνση*</label>
                      <input type="text" className="form-control" id="address" value={this.state.address} readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="orofos">Όροφος*</label>
                      <input type="text" className="form-control" id="orofos" value={this.state.orofos} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Τηλέφωνο*</label>
                      <input type="text" className="form-control" id="phone" value={this.state.phone} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="comments">Σχόλια</label>
                      <textarea type="text" className="form-control" id="comments" value={this.state.comments} onChange={this.handleChange}></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="coupon">Κουπόνι</label>
                      <input type="text" className="form-control" id="coupon" value={this.state.coupon} onChange={this.handleChange} />
                      <button type="button" className="btn btn-light" style={{marginTop:10}} id="couponbutton" onClick={this.handleCoupon}>Εφαρμογή κουπονιού</button>
                    </div>
                  </form>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            <div className="">
              <Card>
                <CardBody>
                  <CardTitle>Η παραγγελία μου</CardTitle>
                  <div className="pad-top">
                    <div>
                    {this.state.baskets.map((basket,basketindex) => {
                      return <div key={basketindex}>
                        <b>{(this.state.catalogues[basket.catalogue] || {}).Name}</b><br />
                        {basket.items.map((data,index) => <CheckoutBasketItem item={data} key={index} />)}
                      </div>
                    })}
                    </div>
                    { this.state.extraCharge ? 
                      <CheckoutBasketItem item={{quantity : 1, object : { Name : "Έξτρα Χρέωση" }, description: [], TotalPrice: Constants.extraCharge }} />
                    : "" }
                    { this.state.formula !== 0 ? 
                      <CheckoutBasketItem item={{quantity : 1, object : { Name : "Έκπτωση" }, description: [], TotalPrice: -this.state.formula }} />
                    : "" }
                    <div className="text-right total">
                      Σύνολο : {this.calculateTotal()} <span className="fa fa-euro"></span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="">
              <Card>
                <CardBody>
                  <div className="pad-top">
                    <div className="final">
                      <button className="btn btn-success calltoaction" onClick={this.sendOrder}>Φέρε το φαΐ</button>                  
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Checkout;