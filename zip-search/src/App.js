import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div id>
    <div id>
      {props.cityLocation}
    </div>
    <ul>
    <li>State: {props.state} </li>
    <li>Location: {props.locationCoords} </li>
    <li>Population (estimated): {props.population} </li>
    <li>Total Wages: {props.totalWages} </li>
    </ul>

    </div>
    );
}

function ZipSearchField(props) {
  return (<div id>
    <div>Zip Code: </div>
    <input type = "text" onChange= {props.changeHandler} value = {props.zipCode}/>
    </div>
    );
}


class App extends Component {

  state = {
    zipCode: '',
    data: [],
  }

 zipChanged = (event) => {
   let length = event.target.event.length
   if(length < 6)
   {
     this.setState({zipCode: event.target.value, data:[]})
     if(length === 5)
     {
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
      .then((res) => res.json())
      .then((data) => this.setState({data:data}))
     }
   }
 }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode ={this.state.zipCode} changeHandler = {this.zipChanged} />
        <div>
          {
            this.state.data.map((info , i) => (
            <City key = {i} 
            state = {info.State}
            cityLocation = {info.Location}
            locationCoords = {info.Lat + info.Long}
            population = {info.EstimatedPopulation}
            totalWages = {info.TotalWages}
            />
            ))}
        </div>
      </div>
    );
  }
}

export default App;
