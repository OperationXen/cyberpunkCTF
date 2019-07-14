import React, { Component } from 'react'
import logo from '../logo.svg'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

import '../styles/App.css'
import TitleBar from './TitleBar'
import LoginGizmo from './Login'
import GameContainer from './GameContainer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      userName: "",
      isAdmin: false
    }
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/authcheck").then(result => result.json()).then((result) => {
      this.setState({
        isAuthenticated: result.isAuthenticated ? true:false,
          userName: result.userName,
          isAdmin: result.isAdmin ? true:false
        })
    });
  }

  render() {
    let content;

    if(this.state.isAuthenticated){
      content = <GameContainer />
    }
    else {
      content = <LoginGizmo />
    }

    return (
      <div className="App">
        <TitleBar title={"pew"} />

        {content}

      </div>
    );
  }
}

export default App;
