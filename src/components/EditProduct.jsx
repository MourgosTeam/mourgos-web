import React, { Component } from 'react';
import './EditProduct.css';


import Attribute from './Attribute.jsx';
import {Modal, Button, ButtonGroup} from 'react-bootstrap'


class EditProduct extends Component {
  constructor(props){
    super(props);
    this.closeModal = props.closeModal;
    this.onSubmit = props.onSubmit;

    var opts = props.selectedAttributes;
    this.state = {
      quantity  : props.quantity,
      options   : opts
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      quantity : nextProps.quantity,
      options  : nextProps.selectedAttributes
    });
  }

  attributeSelected = (data,index) => {
    var newOptions = [...this.state.options];
    newOptions[index] = data;
    this.setState({ options : newOptions});
  }
  
  submitItem = () => { 
    var attributes = this.props.attributes;
    var selected = [];
    var res = this.state.options.map((data,index) => {
      selected[index] = data;
      if(data === -1 || data === undefined)return "";
      return this.props.attributes[index].Name + ": " + this.props.attributes[index].Options[data];
    });
    this.onSubmit(this.props.object,res, this.state.quantity, attributes, selected);
    this.setState({options : [], quantity : 1});
  }

  more = () => {
    this.setState({quantity:this.state.quantity+1});
  }

  less = () => {
    this.setState({quantity:this.state.quantity-1 || 1});
  }
  render() {
    return (
      <div>
      <Modal show={this.props.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.object.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
            {this.props.attributes.map((object, index) => {
                return  (<div className="row" key={(index+1)*Math.random()}>
                            <div className="col-xs-12">
                              <h4>{object.Name}</h4>
                              <Attribute id={object.id} object={object} selected={this.state.options[index]} key={(index+1)*Math.random()} attributeSelected={(data) => this.attributeSelected(data,index)}></Attribute>
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
            <Button onClick={ () => this.submitItem()} className="btn btn-default">{this.props.buttonText}</Button>
          </Modal.Footer>
        </Modal>
        </div>);
  }

}

export default EditProduct;