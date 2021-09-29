import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div>
    <div>
      {props.cityLocation}
    </div>
    <ul>
    <li>State: {props.state} </li>
    <li>Location: {props.locationCoordsLat + ',' + props.locationCoordsLong} </li>
    <li>Population (estimated): {props.population} </li>
    <li>Total Wages: {props.totalWages} </li>
    </ul>

    </div>
    );
}

function ZipSearchField(props) {
  return (<div>
    <div>Zip Code: </div>
    <input type = "text" onChange= {props.changeHandler} value = {props.zipCode}/>
    </div>
    );
}


class App extends Component {

  state = {
    zipCode: '',
    cities: [],
  }

 zipChanged = (event) => {
  console.log(event.target.value)
  this.setState({zipCode: event.target.value})
  if(event.target.value.length === 5)
  {      
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  this.setState({cities:data})
  })
  .catch(err =>{
    console.log('No results')
    this.setState({cities: [] })
  })}
  else{
    this.setState({cities: [] })
  }

    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode ={this.state.zipCode} changeHandler = {this.zipChanged} />
        <div>Current Zip is {this.state.zipCode}</div>
        <div>
          {
            this.state.cities.map((city) => 
            <City data = {city} cityName = {city.City}
            state = {city.State}
            population = {city.EstimatedPopulation}
            totalWages = {city.TotalWages}
            locationCoordsLat ={city.Lat}
            locationCoordsLong = {city.Long}
            cityLocation = {city.LocationText}
            />
            )}
            {this.state.cities.length === 0 ? <h1>No Results</h1>:null}
        </div>
      </div>
    );
  }
}

export default App;
