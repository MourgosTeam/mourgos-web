import React, { Component } from 'react';

import './Home.css';
import Autocomplete from 'react-google-autocomplete';

import {UISref, UISrefActive} from '@uirouter/react';

import Partners from './Partners.jsx';

class Home extends Component {
  
  constructor(props){
    super(props);

    if(props.resolves.hasCreds && props.resolves.hasCreds.place){
      setTimeout( () => this.placeSelected(props.resolves.hasCreds.place), 100);
    }
  }

  componentDidMount = () => {
    this.createMap();
  }

  createMap = () => {
    var google = window.google;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.63178, lng: 22.95151}, //40.63178, 22.95151 kamara
      zoom: 14,
      gestureHandling: "cooperative"
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
    this.polygon = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.11
          });
    this.polygon.setMap(this.map);
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
    document.getElementById('no-service').style.display = 'none';
    document.getElementById('accept').style.display = 'none';
    document.getElementById('no-number').style.display = 'none';

    if(!  this.noNumber(place)){
      document.getElementById('no-number').style.display = 'block';
      return;
    }

    if(place.geometry && place.geometry.location){
      //this.map.setCenter(place.geometry.location);
      if(this.marker)this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: place.geometry.location, 
        map: this.map
      });
      
      let point;
      if( typeof place.geometry.location.lat === "function" )
        point = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
      else 
        point = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);

      if (google.maps.geometry.poly.containsLocation(point, this.polygon) ){
        document.getElementById('accept').style.display = 'block';
        localStorage.setItem("user_address", place.name);
        localStorage.setItem("place" , JSON.stringify(place));
        this.props.onCredentialChange();
      }
      else{
        document.getElementById('no-service').style.display = 'block';
      }
    }
    else{
      if(this.marker)this.marker.setMap(null);
    }
    document.getElementById("address_input").value = place.formatted_address;
  }

  render = () => {
    return (
      <div className="container-fluid home">
        <div className="row overlay">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2 autocomplete  welcome-panel">
                <div className="row">
                  <div className="col-12 slogan d-none d-md-block">
                    Που θες να έρθει ο Μούργος σήμερα;
                  </div>
                  <div className="col-12 col-lg-8">
                    <Autocomplete id="address_input"
                        style={{width:"100%"}}
                        onPlaceSelected={this.placeSelected}
                        types={['address']}
                        componentRestrictions={{country: "gr"}}/>
                  </div>

                  <div className="col-12 col-lg-4 accept-button" id="accept">
                    <UISrefActive class="active">
                      <UISref to="allcatalogues">
                        <button className="btn btn-success">Επιλογή Διεύθυνσης</button>
                      </UISref>
                    </UISrefActive>
                  </div>
                  <div className="col-12 col-md-4 no-service-button" id="no-service">
                    <button className="btn btn-danger btn-static">Εκτός περιοχής</button>
                  </div>
                  <div className="col-12 col-md-4 no-number-button" id="no-number">
                    <button className="btn btn-warning btn-static">Συμπληρώστε αριθμό</button>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div> 

        <div className="row">
          <div className="col-12 map" id="map">test</div>
        </div>

        <div className="row">
          <div className="col-12 text-center partners-title">
            Συνεργαζόμενα Καταστήματα
          </div>
          <Partners></Partners>
        </div>
      </div>
    );
  }
}
export default Home;