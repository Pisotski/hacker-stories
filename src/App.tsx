import * as React from 'react';
import './App.css'

const welcome = {
  title: 'Useful Game',
  greeting: 'wasa-wasa'
}
const kids = ['Alan', 'Barry', 'Cameron', 'Daniella'];

function App() {
  return (
    <div className="top-wrapper">
      <h1>
        {welcome.title}: {welcome.greeting}
      </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
      <ul>
        {kids.map(kid => <li>{kid}</li>)}
      </ul>
    </div>
  )
}

export default App