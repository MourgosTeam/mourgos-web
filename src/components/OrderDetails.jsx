import React, { Component } from 'react';
import './OrderDetails.css';
import { Card,  CardBody, CardTitle } from 'reactstrap';

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
    localStorage.setItem("basket", null);
    window.storageUpdated();

    this.getOrder();
    this.state = {
      order : {
        Items : [],
        Total : 0,
        Status: -1,
        Hashtag: '',
        HashtagFormula: 0
      }
    }
  }

  getOrder = () => {
    var resorder;
    GetIt("/orders/"+this.code, "GET").then(function(data) {
      return data.json();
    }).then((data) => {
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

      return resorder;
    }).
    then( (order) => this.setState({order : order}));
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
                  <span className="fa fa-check"></span>
                </div>
                {this.state.order.Status === 0 ?  
                <div className="col-12 col-md-8 offset-md-2 alert alert-primary" role="alert">
                  Το φαγητό σου ετοιμάζεται και ο μούργος πάει να το παραλάβει 
                </div>
                : '' }
                {this.state.order.Status === 1 ?  
                <div className="col-12 col-md-8 offset-md-2 alert alert-success" role="alert">
                  Ο Μούργος παρέλαβε το φαγητό σου και έρχεται
                </div>
                : '' }
                {this.state.order.Status === 99 ?  
                <div className="col-12 col-md-8 offset-md-2 alert alert-danger" role="alert">
                  Η παραγγελία απορρίφθηκε απο το κατάστημα 
                </div>
                : '' }
                <div className="row justify-content-center content">
                  <div className="col-12">Κωδικός παραγγελίας</div>
                  <div className="order-code col-10 col-sm-7 col-md-5 col-lg-4">
                    <div className="up-code">{this.code}</div>
                  </div>
                </div>
                <div className="col-8 col-md-6 offset-md-3 alert alert-secondary">
                    {this.state.order.Items.map((data,index) => {
                      return <OrderItem item={data} key={index} />;
                    })}
                    { this.state.order.hasExtra ? 
                      <OrderItem item={{quantity : 1, object : { Name : "Έξτρα Χρέωση" }, description: [], TotalPrice: 0.50 }} />
                    : ""}

                    { this.state.order.Hashtag.length > 3 ? 
                      <OrderItem item={{quantity : 1, object : { Name : "Έκπτωση " }, description: [], TotalPrice: -this.state.order.HashtagFormula }} />
                    : ""}
                    <div >
                      Σύνολο : { ( parseFloat(this.state.order.Total) + (this.state.order.hasExtra ? 0.5 : 0) - (this.state.order.HashtagFormula !== 0 ? Math.min(this.state.order.HashtagFormula, parseFloat(this.state.order.Total) + (this.state.order.hasExtra ? 0.5 : 0)) : 0)).toFixed(2)} <span className="fa fa-euro"></span>
                    </div>
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