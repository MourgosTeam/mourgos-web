import React, { Component } from 'react';
import './Attribute.css';

// import { GetIt } from '../helpers/helpers.js'
import {Button, ButtonGroup, ToggleButton,ToggleButtonGroup} from 'react-bootstrap'
function AttributeOption(props){
  return (<ToggleButton className="AttributeOption" value={props.key}>
            {props.optionName}
          </ToggleButton>);
}
class Attribute extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;

    this.object = props.object;
    this.object.Options = JSON.parse(this.object.Options);
    

    const options = this.object.Options.map( function(data, index){
      return AttributeOption({optionName : data , key : index});
    });

    this.state = {
      options : options,
      selected : null
    }
  }

  render() {
    return (
      <div className="col-xs-12">
        <ToggleButtonGroup type="radio" name="options">
          {this.state.options}
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default Attribute;
