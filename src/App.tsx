import * as React from 'react';
import './App.css'

const welcome = {
  title: 'Road to React',
  greeting: 'Hello, Friend'
}

// Go ahead and render the item’s url, author, num_comments, and points as well. 
// In the special case of the url, use an HTML anchor HTML element (read: <a> tag) that surrounds the title. 

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
}, {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
}, ];

function App() {
  return (
    <div className="top-wrapper">
      <Search />
      <hr />
      <List />
    </div>
  )
}

function Search() {
  return(
    <div className="search-wrapper">
      <h1>
        {welcome.title}: {welcome.greeting}
      </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  )
}

function List() {
    return (
      <div>
        {list.map((item) => {
          return (
            <ul className="technology" key={item.objectID}>
              <a href={item.url}>{item.title}</a>
              <li>Author: {item.author}</li>
              <li>Comments: {item.num_comments}</li>
              <li>Points: {item.points}</li>
            </ul>
          )
        })}
      </div>
    )
}

export default App