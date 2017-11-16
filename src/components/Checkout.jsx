import React, { Component } from 'react';

import './Checkout.css';
// import {UISref, UISrefActive} from '@uirouter/react';

import { Card,  CardBody, CardTitle } from 'reactstrap';



class BasketItem extends Component{
  render(){
    return (<div className="row basket-item">
      <span className="description col-12 col-sm-8 col-md-8 text-left">{this.props.item.quantity}x {this.props.item.object.Name}</span>
      <span className="price col-12 col-sm-4 col-md-4 text-right">{this.props.item.TotalPrice.toFixed(2)} 
        <span className="fa fa-euro"></span> 
      </span>
      <div className="col-8 text-left"> 
        {this.props.item.description.map((data, index) => {return <div className="basket-item-description" key={index}>{data}</div>})}
      </div>
    </div>);
  }
}


class Checkout extends Component {
  
  constructor(props){
    super(props);

    var local = JSON.parse(localStorage.getItem('basket'));
    if(!local){
      local = {
        items : [],
        total : 0
      }
    }
    
    var localData = JSON.parse(localStorage.getItem("user_data"));
    if(!localData)localData = {};
    this.state = {
      name    : localData.name || "",
      koudouni: localData.koudouni || "",
      address : localStorage.getItem("user_address"),
      phone   : localData.phone || "",
      comments: localData.comments || "",
      basketItems : local.items,
      basketTotal : local.total,
      diffName : localData.diffName || false
    }
  }

  componentDidUpdate(){
    var storage = {
      name : this.state.name,
      koudouni: this.state.koudouni,
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

  toggle = (e) =>{
    var t = e.target;
    this.setState((prev) => ({
      [t.id] : t.checked
    }));
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
                      <label htmlFor="name">Όνομα</label>
                      <input type="text" className="form-control" id="name" placeholder="Όνομα" value={this.state.name} onChange={this.handleChange}/>
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
                      <label htmlFor="address">Διεύθυνση</label>
                      <input type="text" className="form-control" id="address" value={this.state.address} readOnly/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Τηλέφωνο</label>
                      <input type="text" className="form-control" id="phone" value={this.state.phone} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Σχόλια</label>
                      <textarea type="text" className="form-control" id="comments" value={this.state.comments} onChange={this.handleChange}></textarea>
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
                      {this.state.basketItems.map((data,index) => {
                        return <BasketItem item={data} key={index} />;
                      })}
                    </div>
                    <div className="text-right total">
                      Σύνολο : {this.state.basketTotal.toFixed(2)} <span className="fa fa-euro"></span>
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
                      <button className="btn btn-success calltoaction">Φέρε το φαΐ</button>
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