import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import TodosList from "./components/todos-list.component"
import EditTodo from "./components/edit-todos.component"
import CreateTodo from "./components/create-todos.component"

import logo from "./logo.png"
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    /** Router may have only one child element */
    <Router>
      <div className = "container">
        <nav className = "navbar navbar-expand-lg navbar-light bg-light">
          <a className = "navbar-brand" href = "https://codingthesmartway.com" target="_blank">
            <img src={logo} width="30" alt="CodingTheSmartWay.com"/>
          </a>
          <Link to="/" className="navbar-brand"> MERN-Stack todo app</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">TodosList</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
              <li className="navbar-item">
                <Link to="/edit/:id" className="nav-link">Edit Todo</Link>
              </li>
              {/* Difference between using a <Link> and <a> elemenet can be observed here */}
              <li className="navbar-item">
                < a href="/" className="nav-link"> messages without anchor element</a>
              </li>
            </ul>
            {/* <ul>
              <li><a href="/">hello</a></li>
              <li><a href="/">Pink</a></li>
            </ul> */}
          </div>
        </nav>

        {/* 
        -) When URL is changed manually to a known section  
        -) Here use of "exact" is to make sure it matches exactly to "/" or "/edit", "/create" will end up rendering "/".
        -) Order of the call is very important while delegating to different components. 
        -) render will only happen once even if its been declared several times.  
        */}
        <Route exact path = "/"  component={TodosList} /> 
        <Route path = "/edit/:id" component={EditTodo} />
        <Route path = "/create" component={CreateTodo} />
      </div>
      
    </Router>
  );
}

export default App;
