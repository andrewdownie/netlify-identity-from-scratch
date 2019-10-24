import React from 'react';
import logo from './logo.svg';
import './App.css';

import netlifyIdentity from 'netlify-identity-widget';

function App() {

  function generateHeaders () {
    let headers = {'content-type': 'application/json'};

    const user = netlifyIdentity.currentUser();

    if(user != null){
      return user.jwt()
      .then(token => {
        console.log('header token is', token);
        return {...headers, token}
      })
    }

    return Promise.resolve(headers);
  }

  function authedBackEndCall() {
    console.log('this is authed back end call');

    generateHeaders().then(headers => {
      fetch('/.netlify/functions/authedBackendCall', {
        method: 'POST',
        headers
      })
      .then(result => result.json())
      .then(resp => {
        console.log(resp)
      })

    })

  }

  const user = netlifyIdentity.currentUser();

  if(user == null){
    netlifyIdentity.open();
  }

  return (
    <div className="App">
      <button onClick={authedBackEndCall}>Authed backend call</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
