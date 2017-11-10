import React, { Component } from 'react';
import './Attribute.css';

import {ToggleButton,ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap'
function AttributeOption(props){
  return (<ToggleButton className="AttributeOption" value={props.key} key={props.key}>
            {props.optionName}
          </ToggleButton>);
}
class Attribute extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;

    this.object = props.object;
    this.object.Options = (typeof this.object.Options === "string") ? JSON.parse(this.object.Options) : this.object.Options;
    

    const options = this.object.Options.map( function(data, index){
      return AttributeOption({optionName : data , key : index});
    });
    this.options = options;
  }

  renderMulti() {
    return (
      <div className="col-xs-12 attribute-multi">
        <h4>{this.object.Name} 
          {((this.object.Price > 0) ? <span className="small-price"> + {this.object.Price}</span> : '' )} 
        </h4>
        <div className="">
          <ToggleButtonGroup type="radio" name="options" defaultValue={this.props.selected === undefined?-1:this.props.selected} onChange={this.props.attributeSelected}>
            {this.options}
            <ToggleButton className="AttributeOption" value={[-1]}>
              <span className="glyphicon glyphicon-minus"></span>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  }
  renderAlone(){
    return (
      <div className="col-xs-6 col-md-4 attribute-solo">
        <ButtonToolbar>
          <ToggleButtonGroup type="checkbox" name="options" defaultValue={this.props.selected} onChange={this.props.attributeSelected}>
            <ToggleButton value={0}>{this.object.Options[0]}</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
  render() {
    if(this.object.Options.length === 1){
      return this.renderAlone();
    }
    else{
      return this.renderMulti();
    }
  }
}

export default Attribute;
