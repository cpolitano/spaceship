import React, { Component } from 'react';
import './App.css';
// import L from 'leaflet';
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
    }

    this.handleCountryClick = this.handleCountryClick.bind(this);
  }

  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ]);
  }

  handleCountryClick(countryIndex) {
    console.log("clicked on a country: ", this.state.worldData[countryIndex])
  }

  componentDidMount() {
    // this.map = L.map("mapdiv", {
    //   center: [19.4, -99.2],
    //   zoom: 13,
    //   layers: [
    //     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //     }),
    //   ]
    // });

    fetch("/world-110m.json", {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((res) => res.json())
    .then((worldData) => {
      console.log(worldData);
      this.setState({
        worldData: feature(worldData, worldData.objects.countries).features
      });
    },
    (err) => {
      console.log(`There was a problem: ${err}`);
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
        <svg width={800} height={450} viewBox="0 0 800 450">
          <g className="countries">
            {
              this.state.worldData.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(this.projection())(d)}
                  className="country"
                  fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  onClick={() => this.handleCountryClick(i) }
                />
              ))
            }
          </g>
          <g className="markers">
            <circle
              cx={this.projection()([8,48])[0]}
              cy={this.projection()([8,48])[1]}
              r={10}
              fill="#E91E63"
              className="marker"
            />
          </g>
        </svg>
        <div id="mapdiv" style={{height:"500px"}}></div>
      </div>
    );
  }
}

export default App;
