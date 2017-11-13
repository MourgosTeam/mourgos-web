import React, { Component } from 'react';

import './Home.css';
import Autocomplete from 'react-google-autocomplete';

import {UISref, UISrefActive} from '@uirouter/react'

class Home extends Component {
  componentDidMount(){
    this.createMap();
  }
  createMap = () => {
    var google = window.google;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.6212524, lng: 22.9110078},
      zoom: 13
    });
    var triangleCoords = [
      { lat : 40.63414, lng : 22.93653 },
      { lat : 40.64007, lng : 22.93614 },
      { lat : 40.6427, lng  : 22.9391 },
      { lat : 40.64219, lng : 22.94573 },
      { lat : 40.63622, lng : 22.96191 },
      { lat : 40.63238, lng : 22.9687 },
      { lat : 40.626, lng   : 22.97018 },
      { lat : 40.62456, lng : 22.97696 },
      { lat : 40.62111, lng : 22.97969 },
      { lat : 40.61843, lng : 22.98089 },
      { lat : 40.61115, lng : 22.97657 },
      { lat : 40.613, lng   : 22.97137 },
      { lat : 40.6135, lng  : 22.96775 },
      { lat : 40.61768, lng : 22.9585 },
      { lat : 40.61772, lng : 22.95293 },
      { lat : 40.62422, lng : 22.95163 }
    ];
    this.polygon = new google.maps.Polygon({paths: triangleCoords});
  }
  noNumber = (place) => {
    var comp = place.address_components;
    for(var i in comp){
      if(comp[i].types.includes('street_number'))return true;
    }
    return false;
  }
  placeSelected = (place) => {
    var google = window.google;
    document.getElementById('no-service').style.visibility = 'hidden';
    document.getElementById('accept').style.visibility = 'hidden';
    document.getElementById('no-number').style.visibility = 'hidden';

    if(!  this.noNumber(place)){
      document.getElementById('no-number').style.visibility = 'visible';
      return;
    }

    if(place.geometry && place.geometry.location){
      this.map.setCenter(place.geometry.location);
      if(this.marker)this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: place.geometry.location,
        map: this.map
      });
      var point = {
        lat: place.geometry.location.lat,
        lng : place.geometry.location.lng      
      };
      if (google.maps.geometry.poly.containsLocation(point, this.polygon) ){
        document.getElementById('accept').style.visibility = 'visible';
        localStorage.setItem("user_address", place.name);
        localStorage.setItem("place" , JSON.stringify(place));
        this.props.onCredentialChange();
      }
      else{
        document.getElementById('no-service').style.visibility = 'visible';
      }
    }
    else{
      if(this.marker)this.marker.setMap(null);
    }
    console.log(place);
  }

  render = () => {
    return (
      <div>
        <div className="map" id="map"></div>
        <div className="container overlay">
          <div className="row autocomplete">
            <Autocomplete
                className="col-xs-12 col-sm-10 col-md-7 col-lg-5"
                style={{width: '90%'}}
                onPlaceSelected={this.placeSelected}
                types={['address']}
                componentRestrictions={{country: "gr"}}/>
          </div>
          <div className="accept-button" id="accept">
            <UISrefActive class="active">
              <UISref to="allcatalogues">
                <button className="btn btn-success">Επιλογή Διεύθυνσης</button>
              </UISref>
            </UISrefActive>
          </div>
          <div className="no-service-button" id="no-service">
            <button className="btn btn-error">Προς το παρόν δεν εξυπηρετείται η διεύθυνση σας</button>
          </div>
          <div className="no-number-button" id="no-number">
            <button className="btn btn-warning">Παρακαλώ συμπληρώστε τον αριθμό της διεύθυνσης</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;