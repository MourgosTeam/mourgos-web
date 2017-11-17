import React, { Component } from 'react';
import './OrderDetails.css';
import { Card,  CardBody, CardTitle } from 'reactstrap';

//import {GetIt} from '../helpers/helpers'

class OrderDetails extends Component {  
  constructor(props){
    super(props);
    this.redirect = props.transition.router.stateService.go;
    this.code = props.transition.params().orderId;
    if(!this.code)this.redirect("allcatalogues");
    localStorage.setItem("lastorder", this.code);
    localStorage.setItem("basket", null);
  }

  render(){
    return (
      <div className="container foodiscoming">
        <div className="row">
          <div className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Ο Μούργος έρχεται!</CardTitle>
                <div className="row justify-content-center content">
                  <div className="col-12">Κωδικός παραγγελίας</div>
                  <div className="order-code col-10 col-sm-7 col-md-5 col-lg-4">
                    <div className="up-code">{this.code}</div>
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