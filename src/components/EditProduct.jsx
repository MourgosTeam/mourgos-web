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
      hasRequirements: props.attributes.length > 0
    };
  }

  componentDidMount() {
    // copy of attribute selected! for default values
    var newOptions = [...this.state.options];
    for(let i=0; i < this.props.attributes.length; i++) {
      if(this.props.attributes[i].Required === "1" && this.props.attributes[i].DefaultOption === -1) continue;
      newOptions[i] = this.props.attributes[i].DefaultOption;
    }
    let flag = newOptions.length !== this.props.attributes.length;
    for (var i = 0; i < newOptions.length && !flag; i++) {
      if( isNaN(newOptions[i]) || newOptions[i] === undefined){
        flag = true;
      }
    }
    
    this.setState({ 
      options: newOptions,
      hasRequirements: flag
    });
  }


  componentWillReceiveProps(nextProps){
    this.onSubmit = nextProps.onSubmit;
    let newOptions = nextProps.selectedAttributes;
    let flag = newOptions.length !== nextProps.attributes.length;
    for (var i = 0; i < newOptions.length && !flag; i++) {
      if( isNaN(newOptions[i]) || newOptions[i] === undefined){
        flag = true;
      }
    }
    this.setState({
      quantity : nextProps.quantity,
      options  : nextProps.selectedAttributes,
      comments  : nextProps.comments,
      hasRequirements: flag
    });
  }

  attributeSelected = (data,index) => {
    if (data instanceof Array) data = data[0];

    var newOptions = [...this.state.options];
    newOptions[index] = data;
    
    let flag = newOptions.length !== this.props.attributes.length;
    for (var i = 0; i < newOptions.length && !flag; i++) {
      if( isNaN(newOptions[i]) || newOptions[i] === undefined){
        flag = true;
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

  calculateExtra = () => {
    return this.state.options.map((data,index) => {
      if(data === -1 || data === undefined)return 0;
      return isNaN(this.props.attributes[index].Price) ? parseFloat(JSON.parse(this.props.attributes[index].Price)[data]) : parseFloat(this.props.attributes[index].Price);
    }).reduce((a,b) => {
      return a+b;
    }, 0);
  }


  render() {
    return (

      <div>
        <Modal isOpen={this.props.showModal} toggle={this.closeModal} fade={true}>
          <ModalHeader>
            <div className="modal-title">
              {this.props.object.Name}  
              {/*
                <AttributeAdder object={this.props.object} /> 
              //*/}
            <div className="modal-title-price">{(this.props.object.Price*this.state.quantity + this.calculateExtra() ).toFixed(2)} <span className="fa fa-euro"></span></div>
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
            <Button onClick={ () => this.submitItem()} disabled={this.state.hasRequirements} className="btn btn-light">{ this.state.hasRequirements ? 'Επίλεξε υλικά' : this.props.buttonText}</Button>
          </ModalFooter>
        </Modal>
      </div>);
  }

}

export default EditProduct;
