import React from 'react';
import logo from './logo.svg';
import './App.css';

import netlifyIdentity from 'netlify-identity-widget';

function App() {
  function generateHeaders () {
    const headers = {'content-type': 'application/json'};

    const user = netlifyIdentity.currentUser();

    if (user) {
      return user.jwt().then(token => {
        return {...headers, Authorization: `Bearer ${token}`};
      })
    }

    return Promise.resolve(headers);
  }

  function backendCall () {

    generateHeaders().then(headers =>  {
      fetch('/.netlify/functions/authedBackend', {
        method: 'POST',
        headers
      })
      .then(stream => stream.json())
      .then(json => console.log(json));

    })
  }

  return (
    <div className="App">
      <button onClick={() => netlifyIdentity.open()}>Open Widget</button>
      <button onClick={backendCall}>Backend call</button>
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
