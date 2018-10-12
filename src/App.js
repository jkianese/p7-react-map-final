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
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "F1BIU3KU3RZFBQKCLKJ2MX1AT2ZRZFYRUXTJUMFGA1YUS5ZF",
      client_secret: "LUY5JVOKL3Y0W0FCHDLIJ4A1DXKJVHKBRDOR4CHCWSRG54TJ",
      query: "attractions",
      near: "Pittsburgh",
      v: "20181011"
    }
    // Run: npm install axios
    axios.get(endPoint + new URLSearchParams(parameters)) 
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, scriptSrc())
      })
      .catch(error => {
        console.log("Error: " + error)
      })

  }

  initMap = () => {
    let google = window.google

    const map = new google.maps.Map(document.getElementById('map') , {
      center: { lat: 40.448506, lng: -80.00250},
      zoom: 12
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

function scriptSrc() {
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
