import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

import TitleBar from './TitleBar'
import FlagsContainer from './FlagsContainer'


function App() {
  return (
    <div className="App">
      <TitleBar title={"pew"}/>

      <FlagsContainer />

    </div>
  );
}

export default App;