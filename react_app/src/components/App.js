import React from 'react'
import logo from '../logo.svg'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

import '../styles/App.css'
import TitleBar from './TitleBar'
import LoginGizmo from './Login'
import GameContainer from './GameContainer'

function App() {
  return (
    <div className="App">
      <TitleBar title={"pew"}/>

      <LoginGizmo /> 

    </div>
  );
}

export default App;
