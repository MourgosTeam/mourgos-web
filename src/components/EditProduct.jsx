import React, { Component } from 'react';
import './EditProduct.css';


import Attribute from './Attribute.jsx';
import { ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// function AttributeAdder(props) {
//   return <a target="_new" href={"/attributes.html?id="+props.object.id+"&name="+props.object.Name}>Edit</a>              
// }
class EditProduct extends Component {
  constructor(props){
    super(props);
    this.closeModal = props.closeModal;
    this.onSubmit = props.onSubmit;

    var opts = props.selectedAttributes;
    this.state = {
      quantity  : props.quantity,
      options   : opts,
      comments  : props.comments,
      hasRequirements: true
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      quantity : nextProps.quantity,
      options  : nextProps.selectedAttributes
    });
  }

  attributeSelected = (data,index) => {
    if (data instanceof Array) data = data[0];

    var newOptions = [...this.state.options];
    newOptions[index] = data;
    
    let flag = newOptions.length !== this.props.attributes.length;
    for (var i = 0; i < newOptions.length; i++) {
      if( isNaN(newOptions[i]) || newOptions[i] === undefined || newOptions[i] == -1 ){
        flag = true;
        break;
      }
    }
    
    this.setState({ 
      options: newOptions,
      hasRequirements: flag
    });
  }

  handleChange = (e) => {
    var target = e.target;
    this.setState({
      [target.id]: target.value
    });
  }

  submitItem = () => { 
    var attributes = this.props.attributes;
    var selected = [];
    var res = this.state.options.map((data,index) => {
      selected[index] = data;
      if(data === -1 || data === undefined)return "";
      return this.props.attributes[index].Name + ": " + this.props.attributes[index].Options[data];
    });
    this.onSubmit(this.props.object,res, this.state.quantity, attributes, selected, this.state.comments);
    this.setState({options : [], quantity : 1, comments : ""});
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
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.props.showModal} toggle={this.closeModal} fade={true}>
          <ModalHeader toggle={this.closeModal}>
            <div className="modal-title">
              {this.props.object.Name}  
              {/*
                <AttributeAdder object={this.props.object} /> 
              //*/}
            <div className="modal-title-price">{(this.props.object.Price*this.state.quantity).toFixed(2)} <span className="fa fa-euro"></span></div>
            </div>
            <div className="modal-title-description">{this.props.object.Description}</div>
          </ModalHeader>
          
          <ModalBody>
            <div className="container-fluid">
            {this.props.attributes.length ? 
            (this.props.attributes.map((object, index) => {
                return  (<div className="row" key={(index+1)*Math.random()}>
                           <Attribute id={object.id} object={object} selected={this.state.options[index]} key={(index+1)*Math.random()} attributeSelected={(data) => this.attributeSelected(data,index)}></Attribute>
                          </div>); 
            }))
            : ""}
              <div className="row">
                <div className="col-12">
                  <h5>Σχόλια</h5>
                  <textarea className="form-control" id="comments" onChange={this.handleChange} value={this.state.comments}></textarea>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup className="other-dir">
              <Button size="sm" onClick={this.less} className="btn-light"><span className="fa fa-minus"></span></Button>
              <Button size="sm" disabled  className="btn-light">{this.state.quantity}</Button>
              <Button size="sm" onClick={this.more} className="btn-light"><span className="fa fa-plus"></span></Button>
            </ButtonGroup>
            <Button onClick={ () => this.submitItem()} disabled={this.state.hasRequirements} className="btn btn-light">{ this.state.hasRequirements ? 'Επέλεξε υλικά' : this.props.buttonText}</Button>
          </ModalFooter>
        </Modal>
      </div>);
  }

}

export default EditProduct;
