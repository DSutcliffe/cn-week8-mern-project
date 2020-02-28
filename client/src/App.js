import React, { Component } from 'react'
import './css/App.css';

class App extends Component {

  async getPong() {
    // use built in fetch instead of axios...
    let data = await fetch('http://localhost:8080/ping');

    console.log(await data.text());
    
  }

  render() {
    return (
      // word div not required!!! Hmmmmmm
      <div>
        <button onClick={this.getPong}>send a get request</button>
      </div>
    )
  }
}

export default App;