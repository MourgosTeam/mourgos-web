import React, { Component } from 'react';
import './EditProduct.css';


import Attribute from './Attribute.jsx';
import {Modal, Button, ButtonGroup} from 'react-bootstrap'


class EditProduct extends Component {
  constructor(props){
    super(props);
    this.closeModal = props.closeModal;
    this.onSubmit = props.onSubmit;

    this.attributeSelected = this.attributeSelected.bind(this);
    this.submitItem = this.submitItem.bind(this);

    this.more = this.more.bind(this);
    this.less = this.less.bind(this);

    this.state = {
      quantity : 1
    };
    this.options = [];

  }

  attributeSelected(data,index){
    this.options[index] = data;
  }
  
  submitItem(){ 
    var res = this.options.map((data,index) => {
      if(!this.props.attributes[index] || data === -1)return "";
      return this.props.attributes[index].Name + ": " + this.props.attributes[index].Options[data];
    });
    this.onSubmit(this.props.object,res, this.state.quantity);
  }

  more(){
    this.setState({quantity:this.state.quantity+1});
  }

  less(){
    this.setState({quantity:this.state.quantity-1 || 1});
  }
  render() {
    var self = this;
    return (
      <div>
      <Modal show={this.props.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.object.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
            {this.props.attributes.map(function(object, index){
                return  (<div className="row" key={(index+1)*Math.random()}>
                            <div className="col-xs-12">
                              <h4>{object.Name}</h4>
                              <Attribute id={object.id} object={object} key={(index+1)*Math.random()} attributeSelected={(data) => self.attributeSelected(data,index)}></Attribute>
                            </div>
                          </div>); 
            })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup className="pull-left">
              <Button bsSize="sm" onClick={this.less}><span className="glyphicon glyphicon-minus"></span></Button>
              <Button bsSize="sm" disabled>{this.state.quantity}</Button>
              <Button bsSize="sm" onClick={this.more}><span className="glyphicon glyphicon-plus"></span></Button>
            </ButtonGroup>
            <Button onClick={ () => self.submitItem()} className="btn btn-default">Προσθήκη</Button>
          </Modal.Footer>
        </Modal>
        </div>);
  }

}

export default EditProduct;
