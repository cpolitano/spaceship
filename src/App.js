import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';

class App extends Component {

  componentDidMount() {
    this.map = L.map("mapdiv", {
      center: [19.4, -99.2],
      zoom: 13,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            Spaceship
          </div>
        </header>
        <div id="mapdiv" style={{height:"300px"}}></div>
      </div>
    );
  }
}

export default App;
