import React, { Component } from 'react';
import './Catalogue.css';

import { GetIt, BackgroundImage} from '../helpers/helpers.jsx'
import Category from "./Category.jsx"



import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class Catalogue extends Component {
  constructor(props){
    super(props);
    
    this.id = props.id;
    this.object = props.object;
    this.mode = props.mode || "minimal";

    this.openForAdd = props.openForAdd;

    this.state = { 
      categories : [],
      object : props.object || {}
    };

    switch(this.mode){
      case 'minimal':
        
        break;
      default:
      case 'normal':
        this.getCategories();
        break;
      case 'card':
        
        break;
    }
    
    
  }

  getCategories(){
    var self = this;
    GetIt("/categories/catalogue/"+this.id , "GET")
    .then(function(data){
      return data.json();
    })
    .then(function(data){
      return data.map(function(object, index){
        return <Category id={object.id} object={object} key={index} mode="normal" openForAdd={self.openForAdd}> { object.Name } </Category>; 
      });
    })
    .then(
     (data) => this.setState({categories : data})
    );
  }

  renderMinimal() {
    let hours = this.props.object.WorkingHours && this.props.object.WorkingHours.split(","),
        fromTime = hours && hours[0].split(':'),
        toTime = hours && hours[1].split(':'),
        today = new Date(),
        open = fromTime && toTime && today.getHours() > fromTime[0]   && today.getHours() <  toTime[0] &&
               today.getMinutes() > fromTime[1] && today.getMinutes() < toTime[1];
        open = open === null;

    return (
      <div className={"col-12 col-sm-6 col-md-4 text-center sm-pad-all minimal-mode " + (open === false ? 'closedShop' : 'openShop')} >
        <a href={open && '/'+this.props.object.FriendlyURL}>
          <Card>
            <div width="100%" className="hero-image" style={BackgroundImage(this.props.object.HeroImage)} alt={this.props.object.Name}></div>
            <div width="100%" className="logo-image" style={BackgroundImage(this.props.object.Image)} alt={this.props.object.Name}></div>
            <CardBody>
              <CardTitle>{this.props.object.Name}</CardTitle>
              <CardText>{this.props.object.Description}</CardText>
              {open === false && <img className='closed' src={'/images/closed.png'} alt="Closed Shop"/>}
            </CardBody>
          </Card>
        </a>
      </div>
    );
  }
  renderNormal(){
    return (
      <div>
        <div>
          <div className="col-12 catalogue-view-title">
            <div>{this.props.object.Name}</div>
            <div><img src={this.props.object.Image} className="catalogue-view-image" alt=""/></div>
            <div className="catalogue-view-subtitle">{this.props.object.Description}</div>
          </div>
          <div className="col-12 catalogue-view-image">
          </div>
        </div>
        <div>
            {this.state.categories}
        </div>
      </div>
    );
  }

  renderCard(){
      return (
        <div className="col-12 col-sm-10 col-md-5 col-lg-5 col-xl-3 text-center sm-pad-all catalogue card-mode" >
           <Card>
            <div width="100%" className="hero-image" style={BackgroundImage(this.props.object.HeroImage)} alt={this.props.object.Name}></div>
            <div width="100%" className="logo-image" style={BackgroundImage(this.props.object.Image)} alt={this.props.object.Name}></div>
            <CardBody>
              <CardTitle>{this.props.object.Name}</CardTitle>
              <CardText>{this.props.object.Description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
  }

  render() {
    switch(this.mode){
      case 'normal':
        return this.renderNormal();
      default:
      case 'minimal':
        return this.renderMinimal();
      case 'card':
        return this.renderCard();
    }
  }
}

export default Catalogue;
