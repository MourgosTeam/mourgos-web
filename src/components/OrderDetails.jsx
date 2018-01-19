import React, { Component } from 'react';
import './OrderDetails.css';
import { Card,  CardBody, CardTitle } from 'reactstrap';

import Constants from '../helpers/constants'
import {GetIt} from '../helpers/helpers'

class OrderItem extends Component{
  render(){
    return (<div className="row basket-item">
      <span className="description col-12 col-sm-8 col-md-8 text-left">{this.props.item.quantity}x {this.props.item.object.Name}</span>
      <span className="price col-12 col-sm-4 col-md-4 text-right">{this.props.item.TotalPrice.toFixed(2)} 
        <span className="fa fa-euro"></span> 
      </span>
      <div className="col-8 text-left"> 
        {this.props.item.comments ? 
          ("Σχόλια :" + this.props.item.comments): ""}
      </div>
    </div>);
  }
}

class OrderDetails extends Component {  
  constructor(props){
    super(props);
    this.redirect = props.transition.router.stateService.go;
    this.code = props.transition.params().orderId;
    if(!this.code)this.redirect("allcatalogues");
    localStorage.setItem("lastorder", this.code);
    localStorage.setItem("localbasket", null);
    localStorage.setItem("localbaskettotal", 0);
    window.storageUpdated();

    this.codes = this.code.split('-');
    this.getOrders();
    this.state = {
      order : {
        Items : [],
        Total : 0,
        Status: -1,
        Hashtag: '',
        HashtagFormula: 0
      },
      orders: []
    }
  }

  getOrder = (code) => {
    var resorder;
    return GetIt("/orders/"+code, "GET").then((data) => data.json())
    .then((data) => {
      data.Items = JSON.parse(data.Items) || [];
      resorder = data;
      var promises = [];
      for(var i=0; i < data.Items.length ; i += 1){
        promises.push(GetIt("/products/"+data.Items[i].id, "GET").then((data) => data.json()));
      }
      return Promise.all(promises);
    }).then( (data) => {
      var prods = {};
      for(let i=0;i<data.length;i++){
        prods[data[i].id] = data[i];
      }
      for(let i=0;i<resorder.Items.length;i++){
        resorder.Items[i].object = prods[resorder.Items[i].id];
      }
      // fix totalprice
      resorder.hasExtra = resorder.Extra;
      resorder.Status = parseInt(resorder.Status, 10);

      const total = parseFloat(resorder.Total);
      const extra = resorder.Extra ? Constants.extraCharge : 0;
      const final = total + extra;
      const formula = parseFloat(resorder.HashtagFormula) || 0;
      const discount = parseInt(formula, 10) === 100 ? (formula - 100) * final : Math.min(formula, final);

      resorder.LocalDiscount = discount;
      resorder.LocalTotalPrice =  parseFloat((final - discount).toFixed(2));
      return resorder;
    });
  }

  getOrders = () => {
    const proms = [];
    for(var i=0;i<this.codes.length;i+=1){
      proms.push(this.getOrder(this.codes[i]));
    }

    Promise.all(proms).then((values) => {
      console.log(values);
      this.setState({
        orders: values
      });
    });
  }


  render(){
    return (
      <div className="container foodiscoming">
        <div className="row">
          <div className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Ο Μούργος έρχεται!</CardTitle>
                <div className="success-circle">
                  <span className="fa fa-check" style={{fontSize: 125, padding: 30}}></span>
                </div>
                {this.state.orders.map((order, index) => 
                    <div className="col-12 col-lg-6 offset-lg-3 alert alert-secondary" key={index}>
                        <div className="row">
                          <div className="col-12 text-left">
                            <b>{order.ShopName} #{order.id.toUpperCase()}</b> 
                            <small className="pull-right">Τηλέφωνο καταστήματος: {order.ShopPhone}</small>
                          </div>
                        </div>
                        {order.Items.map((data,index) => {
                          return <OrderItem item={data} key={index} />;
                        })}
                        {order.hasExtra ? 
                          <OrderItem item={{quantity : 1, object : { Name : "Έξτρα Χρέωση" }, description: [], TotalPrice: 0.50 }} />
                        : ""}
                        {order.Hashtag && order.Hashtag.length > 3 ? 
                          <OrderItem item={{quantity : 1, object : { Name : "Έκπτωση " }, description: [], TotalPrice: -order.LocalDiscount }} />
                        : ""}
                        <div >
                        Μερικό Σύνολο : {order.FinalPrice.toFixed(2)} <span className="fa fa-euro"></span>
                        </div>
                          {order.Status in [1,2] && order.Status !== 0 ?  
                          <div className="col-12 alert alert-primary" role="alert">
                            Το φαγητό σου ετοιμάζεται και ο μούργος πάει να το παραλάβει 
                          </div>
                          : '' }
                          {order.Status === 3 ?  
                          <div className="col-12 alert alert-info" role="alert">
                            Ο Μούργος παρέλαβε το φαγητό σου και έρχεται
                          </div>
                          : '' }
                          {order.Status === 99 ?  
                          <div className="col-12 alert alert-danger" role="alert">
                            Η παραγγελία απορρίφθηκε απο το κατάστημα 
                          </div>
                          : '' }
                          {order.Status === 10 ?  
                          <div className="col-12 alert alert-success" role="alert">
                            Η παραγγελία σας παραδόθηκε
                          </div>
                        : '' }
                    </div>
                  )
                }
                <div>
                  <b>Σύνολο : {this.state.orders.reduce((a,b) => a + b.LocalTotalPrice, 0).toFixed(2)} <span className="fa fa-euro"></span></b>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderDetails;