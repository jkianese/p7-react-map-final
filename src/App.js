import React, { Component } from "react";
import "./App.css";
import Locations from "./components/Locations";
import axios from "axios";

class App extends Component {
  state = {
    myVenues: [],
    allMarkers: [],
    query: "",
    infowindow: [],
    selectedVenue: [],
    map: null
  };

  componentDidMount() {
    this.getVenues();
  }

  // get Google Maps API Key
  getSource = () => {
    scriptSource();
    window.initMap = this.initMap;
  };

  // fetch venue data from Foursquare API using Axios
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "F1BIU3KU3RZFBQKCLKJ2MX1AT2ZRZFYRUXTJUMFGA1YUS5ZF",
      client_secret: "LUY5JVOKL3Y0W0FCHDLIJ4A1DXKJVHKBRDOR4CHCWSRG54TJ",
      query: "arts",
      near: "Pittsburgh, PA",
      limit: 5,
      v: "20181014"
    };
    // Run: npm install axios
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            myVenues: response.data.response.groups[0].items
          },
          this.getSource()
        );
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  // render map using Google Maps JavaScript API
  initMap = () => {
    let google = window.google;

    // Create Map
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.448506, lng: -80.0025 },
      zoom: 12
    });

    // Create InfoWindow
    let infowindow = new google.maps.InfoWindow();
    this.setState({ map, infowindow });

    // Create dynamic animated markers and InfoWindow
    let allMarkers = this.state.myVenues.map(venueInfo => {
      let contentString = `<center> 
      ${venueInfo.venue.name}<br> 
      ${venueInfo.venue.location.address}<br> 
      ${venueInfo.venue.location.city}<br>
      ${venueInfo.venue.location.state}<br>
      ${venueInfo.venue.location.postalCode}<br> 
      </center>`;

      let marker = new google.maps.Marker({
        position: {
          lat: venueInfo.venue.location.lat,
          lng: venueInfo.venue.location.lng
        },
        map: map,
        address: venueInfo.venue.location.address,
        city: venueInfo.venue.location.city,
        state: venueInfo.venue.location.state,
        postalCode: venueInfo.venue.location.postalCode,
        id: venueInfo.venue.id,
        title: venueInfo.venue.name,
        animation: google.maps.Animation.DROP
      });

      // clickable markers
      marker.addListener("click", () => {
        this.sidebarList(marker);

        // Animate The Marker on click
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2000);

        // change content
        infowindow.setContent(contentString);

        // open InfoWindow
        infowindow.open(map, marker);
      });
      return marker;
    });
    this.setState({ allMarkers });
  };

  // Sidebar list of venues
  sidebarList = marker => {
    const contentString = `<center> 
    ${marker.title}<br> 
    ${marker.address}<br> 
    ${marker.city}<br>
    ${marker.state}<br>
    ${marker.postalCode}<br> 
    </center>`;
    console.log(marker);
    this.state.infowindow.close();
    this.state.infowindow.setContent(contentString);
    this.state.infowindow.open(this.state.map, marker);

    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 2000);
  };

  // Filter search
  updateQuery = query => {

    // Close InfoWindow as search changes
    this.state.infowindow.close();

    this.setState({ query });
    if (query.trim() === "") {
      this.state.allMarkers.forEach(marker => marker.setVisible(true));
      return true;
    } else {
      let allVenues = this.state.myVenues.filter(venue => {
        return venue.venue.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
      allVenues.forEach(item =>
        this.state.allMarkers
          .filter(marker => marker.id !== item.venue.id)
          .map(falseMarker => falseMarker.setVisible(false))
      );
      allVenues.forEach(item =>
        this.state.allMarkers
          .filter(marker => marker.id === item.venue.id)
          .map(trueMarker => trueMarker.setVisible(true))
      );
    }
  };

  render() {
    return (
      <main className="map-container">
        <div id="map" role="application" aria-label="map" />
        <div>
          <Locations
            myVenues={this.state.myVenues}
            query={this.state.query}
            allMarkers={this.state.allMarkers}
            updateQuery={this.updateQuery}
            sidebarList={this.sidebarList}
          />
        </div>
      </main>
    );
  }
}

export default App;

function scriptSource() {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyBj5AzHYC1kUPRnvaT6G6zsAONHSpKmoqQ&callback=initMap";
  script.async = true;
  script.defer = true;
  script.onerror = function() {
    document.write("Error: Google Maps can't be loaded");
  };
  index.parentNode.insertBefore(script, index);
}