import React, { Component } from 'react';

import './Home.css';
import Autocomplete from 'react-google-autocomplete';

import {UISref} from '@uirouter/react'

import Partners from './Partners.jsx';

class Home extends Component {
  
  constructor(props){
    super(props);
    this.lastresort = localStorage.getItem("lastresort");

    if(props.resolves.hasCreds && props.resolves.hasCreds.place){
      setTimeout( () => this.placeSelected(props.resolves.hasCreds.place), 100);
    }
  }

  componentDidMount = () => {
    this.createMap();

    (function pacSelectFirst(input) {
        // store the original event binding function
        var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

        function addEventListenerWrapper(type, listener) {
            // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
            // and then trigger the original listener.
            if (type === "keydown") {
                var orig_listener = listener;
                listener = function(event) {
                    var suggestion_selected = document.getElementsByClassName("pac-item-selected").length > 0;
                    if (event.which === 13 && !suggestion_selected) {
 var e = new Event("keydown");
e.keyCode=40;
e.which=e.keyCode;
e.altKey=false;
e.ctrlKey=true;
e.shiftKey=false;
e.metaKey=false;
                        orig_listener.apply(input, [e]);
                    }

                    orig_listener.apply(input, [event]);
                };
            }

            _addEventListener.apply(input, [type, listener]);
        }

        input.addEventListener = addEventListenerWrapper;
        input.attachEvent = addEventListenerWrapper;

    })(document.getElementById('address_input'));
  }

  createMap = () => {
    var google = window.google;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.63178, lng: 22.95151}, //40.63178, 22.95151 kamara
      zoom: 14,
      gestureHandling: "cooperative"
    });
    var triangleCoords = [
      { lat: 40.6332, lon: 22.93752 },
      { lat: 40.62364, lon: 22.95162 },
      { lat: 40.62252, lon: 22.95149 },
      { lat: 40.61635, lon: 22.95117 },
      { lat: 40.61601, lon: 22.95473 },
      { lat: 40.61612, lon: 22.96064 },
      { lat: 40.61452, lon: 22.96269 },
      { lat: 40.61193, lon: 22.96383 },
      { lat: 40.61304, lon: 22.96784 },
      { lat: 40.61366, lon: 22.9697 },
      { lat: 40.61113, lon: 22.97625 },
      { lat: 40.61884, lon: 22.98164 },
      { lat: 40.6228, lon: 22.97889 },
      { lat: 40.62606, lon: 22.97611 },
      { lat: 40.63385, lon: 22.96842 },
      { lat: 40.6374, lon: 22.95843 },
      { lat: 40.63491, lon: 22.95641 },
      { lat: 40.64028, lon: 22.95156 },
      { lat: 40.64234, lon: 22.94647 },
      { lat: 40.6332, lon: 22.93752 }
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
        localStorage.setItem("user_address", place.name );
        localStorage.setItem("formatted_address", place.formatted_address );
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
        <div className="row">
          <div className="container-fluid overlay">
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 autocomplete  welcome-panel">
                <div className="row">
                  <div className="col-12 slogan d-none d-md-block text-center">
                    Πού θες να έρθει ο Μούργος;
                  </div>
                  <div className="col-12 col-lg-12">
                    <Autocomplete id="address_input"
                        style={{width:"100%"}}
                        onPlaceSelected={this.placeSelected}
                        types={['address']}
                        componentRestrictions={{country: "gr"}}
                        placeholder="Γράψε τη διεύθυνσή σου" />
                  </div>

                  <div className="col-12 col-lg-6 offset-lg-3 accept-button p-ud-md" id="accept">
                      {this.lastresort ? 
                        <UISref to="catalogues" params={{catalogueURL : this.lastresort}} className="btn btn-primary last-order pointer">
                          <button className="btn btn-success">Επιλογή διεύθυνσης</button>
                        </UISref> :
                        <UISref to="allcatalogues" className="btn btn-primary last-order pointer">
                          <button className="btn btn-success">Επιλογή διεύθυνσης</button>
                        </UISref>
                      }
                  </div>
                  <div className="col-12 col-lg-6 offset-lg-3 p-ud-md no-service-button" id="no-service">
                    <button className="btn btn-danger btn-static">Εκτός περιοχής</button>
                  </div>
                  <div className="col-12 col-lg-6 offset-lg-3 p-ud-md no-number-button" id="no-number">
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
