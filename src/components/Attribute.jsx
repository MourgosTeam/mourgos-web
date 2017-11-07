import React, { Component } from 'react';
import './Attribute.css';

import {ToggleButton,ToggleButtonGroup} from 'react-bootstrap'
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

  render() {
    return (
      <div className="">
        <ToggleButtonGroup type="radio" name="options" defaultValue={this.props.selected === undefined?-1:this.props.selected} onChange={this.props.attributeSelected}>
          {this.options}
          <ToggleButton className="AttributeOption" value={-1}>
            <span className="glyphicon glyphicon-minus"></span>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default Attribute;
