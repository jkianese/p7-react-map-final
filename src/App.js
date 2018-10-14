import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    venues: [],
    markers: [],
    query: '',
    infowindow: []
  }  

  componentDidMount() {
    this.getVenues()
  }

  // get Google Maps API Key
  getSource = () => {
    scriptSource()
    window.initMap = this.initMap
  }

  // fetch venue data from foursquare API using Axios
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "F1BIU3KU3RZFBQKCLKJ2MX1AT2ZRZFYRUXTJUMFGA1YUS5ZF",
      client_secret: "LUY5JVOKL3Y0W0FCHDLIJ4A1DXKJVHKBRDOR4CHCWSRG54TJ",
      query: "tacos",
      near: "Pittsburgh, PA",
      limit: 5,
      v: "20181014"
    };
    // Run: npm install axios
    axios
      .get(endPoint + new URLSearchParams(parameters)) 
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.getSource())
      })
      .catch(error => {
        console.log("Error: " + error)
      })
  }

  // render map using Google Maps JavaScript API
  initMap = () => {
    let google = window.google
    
    // Create Map
    const map = new google.maps.Map(document.getElementById('map') , {
      center: { lat: 40.448506, lng: -80.00250},
      zoom: 12
    });

    // Create InfoWindow
    let infowindow = new google.maps.InfoWindow()

    // Create dynamic animated markers and InfoWindow   
    this.state.venues.map(myVenues => {

      let contentString = `${myVenues.venue.name}`

      let marker = new google.maps.Marker({
        position: { lat: myVenues.venue.location.lat, lng: myVenues.venue.location.lng },
        map: map,
        Title: myVenues.venue.name,
        animation: google.maps.Animation.DROP
      });

      // clickable markers
      marker.addListener('click', function() {
        marker
          .setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 2000);
        
        // change content
        infowindow.setContent(contentString)
        
        // open InfoWindow 
        infowindow.open(map, marker);
      })

    });

  }

  render() {
    return (
      <main>
        <div id="map">
        </div>
      </main>  
    );
  }
}

export default App;

function scriptSource() {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBj5AzHYC1kUPRnvaT6G6zsAONHSpKmoqQ&callback=initMap'
  script.async = true
  script.defer = true
  script.onerror = function() {
      document.write("Error: Google Maps can't be loaded");
  }
  index.parentNode.insertBefore(script, index)
}
