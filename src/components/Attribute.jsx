import React, { Component } from 'react';
import './Attribute.css';

import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap'
class AttributeOption extends Component{
  render(){
    return (
      <Button className="btn btn-light AttributeOption col-4 btn-sm" onClick={this.props.onSelect}
              active={this.props.selected === this.props.indexKey}>
              {this.props.optionName}
      </Button>);
  }
}
class Attribute extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;


    this.object = props.object;
    this.object.Options = (typeof this.object.Options === "string") ? JSON.parse(this.object.Options) : this.object.Options;
    
    this.isMulti = this.object.Options.length === 1;

    this.selected = 0;
  }

  choose = (key) => {
    this.props.attributeSelected(key);
  }

  toggle = () => {
    if(this.props.selected === 0){
      this.props.attributeSelected(-1);
    }
    else{
      this.props.attributeSelected(0);
    }
  }
  renderMulti() {
    return (
      <div className="col-12 attribute-multi">
        <h5>{this.object.Name} 
          {((this.object.Price > 0) ? <span className="small-price"> + {this.object.Price}</span> : '' )} 
        </h5>
        <div className="">
            {this.object.Options.map( (data, index) => {
              return <AttributeOption optionName={data} key={index} indexKey={index} onSelect={() => this.choose(index)} 
                    selected={this.props.selected}></AttributeOption>;
              })
            }
            <Button className="btn btn-sm btn-light AttributeOption col-4 no-option" onClick={() => this.choose(-1)} value="-1" active={this.props.selected === -1}><span className="fa fa-minus"></span></Button>
        </div>
      </div>
    );
  }
  renderAlone(){
    return (
      <div className="col-6 col-md-4 attribute-solo">
        <ButtonToolbar>
          <ButtonGroup size="sm">
            <Button className="btn btn-light AttributeOption" onClick={this.toggle}
              active={this.props.selected === 0} value={this.props.indexKey}>
              {this.object.Options[0]}
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
  render() {
    if(this.isMulti){
      return this.renderAlone();
    }
    else{
      return this.renderMulti();
    }
  }
}

export default Attribute;
