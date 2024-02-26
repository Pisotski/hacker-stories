import * as React from 'react';
import './App.css'

interface Header {
  title: string;
  greeting: string;
}
const welcome:Header = {
  title: 'the Road to React',
  greeting: 'Hello, Friend'
}

interface Technology {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

const list: Technology[]= [
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

const App = () => (
  <div className="top-wrapper">
    <Search />
    <hr />
    <List />
  </div>
)

const Search = () => (
  <div className="search-wrapper">
    <h1>
      {welcome.title}: {welcome.greeting}
    </h1>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" />
  </div>
)

const List = () => (
  <div>
    {list.map((item:Technology) => (
        <ul className="technology" key={item.objectID}>
          <a href={item.url}>{item.title}</a>
          <li>Author: {item.author}</li>
          <li>Comments: {item.num_comments}</li>
          <li>Points: {item.points}</li>
        </ul>
      )
    )}
  </div>
)

export default App