import React, { Component } from 'react';
import './Attribute.css';

// import { GetIt } from '../helpers/helpers.js'

function AttributeOption(props){
  return (<span className="AttributeOption">
            {props.optionName}
          </span>);
}
class Attribute extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;

    this.object = props.object;
    this.object.Options = JSON.parse(this.object.Options);
    

    const options = this.object.Options.map( function(data, index){
      return <AttributeOption optionName={data} key={index}></AttributeOption>;
    });
    
    this.state = {
      options : options,
      selected : null
    }
  }

  render() {
    return (
      <div className="Attribute">
          {this.state.options}
      </div>
    );
  }
}

export default Attribute;
