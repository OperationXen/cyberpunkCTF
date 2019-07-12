import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

import TitleBar from './titlebar'
import CTFCategoryTest from './category_test'


function App() {
  return (
    <div className="App">
        <TitleBar />
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

        <CTFCategoryTest />

        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </header>
    </div>
  );
}

export default App;
