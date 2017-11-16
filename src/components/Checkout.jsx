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

    this.state = {
      name    : "",
      address : localStorage.getItem("user_address"),
      phone   : "",
      comments: "",
      basketItems : local.items,
      basketTotal : local.total
    }
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
                  <div className="col-12">
                    <div>Όνομα</div>
                    <input type="text" className="textfield" id="name"/>
                    <input type="checkbox" className="" />Έχω άλλο όνομα στο κουδούνι
                    <div>κουδούνι</div>
                    <input type="text" className="textfield" id="koudouni"/> 
                  </div>
                  <div className="col-12">
                    <div>Διεύθυνση</div>
                    <input type="text" className="textfield" id="address" value={this.state.address}/>
                  </div>
                  <div className="col-12">
                    <div>Τηλέφωνο</div>
                    <input type="text" className="textfield" id="phone" />
                  </div>
                  <div className="col-12">
                    <div>Σχόλια</div>
                    <textarea type="text" className="textfield comments" id="comments">
                    </textarea>
                  </div>
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