import React, { Component } from 'react';

import './Home.css';

import {UISref} from '@uirouter/react'

import Partners from './Partners.jsx';

const findComp = (match, place) => {
  return place.address_components.reduce((a,b) => a + (b.types[0]===match ? b.long_name : ""), "");
}

class Home extends Component {
  
  constructor(props){
    super(props);
    this.lastresort = localStorage.getItem("lastresort");

    if(props.resolves.hasCreds && props.resolves.hasCreds.place){
      setTimeout( () => this.placeSelected(props.resolves.hasCreds.place), 100);
    }

    this.state = {
      predictions: []
    };

    this.service = new window.google.maps.places.AutocompleteService();
    this.geocoder = new window.google.maps.Geocoder();
    
  }

  componentDidMount = () => {
    this.createMap();
    const selectFirst = (event) => {
      if (event.which === 13 && this.state.predictions.length) {
        this.predictionSelected(this.state.predictions[0])
      }
    }; 
    document.getElementById('address').addEventListener('keydown', selectFirst)
    document.getElementById('address_number').addEventListener('keydown', selectFirst);
  }

  createMap = () => {
    var google = window.google;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.63178, lng: 22.95151}, //40.63178, 22.95151 kamara
      zoom: 14,
      gestureHandling: "cooperative"
    });
    // var triangleCoords = [
    //   { lat: 40.6332, lng: 22.93752 },
    //   { lat: 40.62364, lng: 22.95162 },
    //   { lat: 40.62252, lng: 22.95149 },
    //   { lat: 40.61635, lng: 22.95117 },
    //   { lat: 40.61601, lng: 22.95473 },
    //   { lat: 40.61612, lng: 22.96064 },
    //   { lat: 40.61452, lng: 22.96269 },
    //   { lat: 40.61193, lng: 22.96383 },
    //   { lat: 40.61304, lng: 22.96784 },
    //   { lat: 40.61366, lng: 22.9697 },
    //   { lat: 40.61113, lng: 22.97625 },
    //   { lat: 40.61884, lng: 22.98164 },
    //   { lat: 40.6228, lng: 22.97889 },
    //   { lat: 40.62606, lng: 22.97611 },
    //   { lat: 40.63385, lng: 22.96842 },
    //   { lat: 40.6374, lng: 22.95843 },
    //   { lat: 40.63491, lng: 22.95641 },
    //   { lat: 40.64028, lng: 22.95156 },
    //   { lat: 40.64234, lng: 22.94647 },
    //   { lat: 40.6332, lng: 22.93752 }
    // ];
var triangleCoords = [
{ lat: 40.63514, lng: 22.93471 },
{ lat: 40.64351, lng: 22.94174 },
{ lat: 40.64082, lng: 22.95109 },
{ lat: 40.63561, lng: 22.95546 },
{ lat: 40.63829, lng: 22.958 },
{ lat: 40.63368, lng: 22.96894 },
{ lat: 40.62631, lng: 22.97014 },
{ lat: 40.6252, lng: 22.97631 },
{ lat: 40.61985, lng: 22.98168 },
{ lat: 40.61449, lng: 22.97911 },
{ lat: 40.60888, lng: 22.98028 },
{ lat: 40.60759, lng: 22.97655 },
{ lat: 40.6047, lng: 22.97474 },
{ lat: 40.60168, lng: 22.97568 },
{ lat: 40.59549, lng: 22.95179 },
{ lat: 40.6026, lng: 22.94979 },
{ lat: 40.61892, lng: 22.95216 },
{ lat: 40.62369, lng: 22.95095 }
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
    console.log(place);
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
      var latLng = this.marker.getPosition(); // returns LatLng object
      this.map.setCenter(latLng);
      
      let point;
      if( typeof place.geometry.location.lat === "function" )
        point = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
      else 
        point = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);

      if (google.maps.geometry.poly.containsLocation(point, this.polygon) ){        
        document.getElementById('accept').style.display = 'block';
        localStorage.setItem("user_address", findComp('route', place) + " " + findComp('street_number', place));
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
    const number = findComp('street_number', place);
    document.getElementById("address").value = place.formatted_address.split(" "+number).join('');
    document.getElementById("address_number").value = number;
    this.setState({
      predictions: []
    });
  }

  predictionSelected = (pred) => {
    console.log(pred);
    if (document.getElementById('address_number').value.length < 1) {
      const address = document.getElementById('address');
      address.value = pred.description;
      return;
    }
    this.geocoder.geocode( { 'placeId': pred.place_id }, (results, status) => {
      if (status === 'OK') {
        this.placeSelected(results[0]);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  onChange(e) {
    const types=['address'],
          componentRestrictions={country: "gr"};

    const hasLetters = document.getElementById('address').value.length;
    const arr = document.getElementById('address').value.split(',');
    const num = document.getElementById('address_number').value;
    const address = arr.map((a,b) => b === 0 ? a + " " + num : a).join(',');

    if(address.length > 3 && hasLetters) {
      this.service.getPlacePredictions({
        input: address,
        types, 
        componentRestrictions
      }, (predictions, status) => {
        if (status === 'OK' && predictions && predictions.length > 0) {
          this.onOpen(predictions);
        } else {
          this.onClose();
        }
      });
    } else {
      this.onClose();
    }
  }

  onOpen = (preds) => {
    this.setState({
      predictions: preds
    });
  }

  onClose = () => {
    this.setState({
      predictions: []
    });
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
                    {/*<Autocomplete id="address_input"
                        style={{width:"90%"}}
                        onPlaceSelected={this.placeSelected}
                        types={['address']}
                        componentRestrictions={{country: "gr"}}
                        placeholder="Γράψε τη διεύθυνσή σου" />*/}
                   {/* <ReactCustomGoogleAutocomplete 
                        input={<input id="address_input" style={{width:"100%"}} placeholder="Γράψε τη διεύθυνσή σου"/>}
                        onPlaceSelected={this.placeSelected}
                        types={['address']}
                        componentRestrictions={{country: "gr"}}
                        onOpen={this.openAuto}
                        onClose={this.closeAuto} />*/}
                    <div className="row">
                      <div className="col-10">
                        <input type="text" placeholder="Γράψε την διεύθυνσή σου" id="address" onChange={(e) => this.onChange(e)}/>
                      </div>
                      <div className="col-2" style={{paddingLeft: 2}}>
                        <input type="text" placeholder="Αρ." id="address_number" onChange={(e) => this.onChange(e)}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="predictions col-12">
                    {this.state.predictions.map((pred, index) =>
                      <div className="prediction col-12" key={index} id={index === 0? 'suggestion':''} onClick={() => this.predictionSelected(pred)}>
                        {pred.description}
                      </div>
                    )}
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
