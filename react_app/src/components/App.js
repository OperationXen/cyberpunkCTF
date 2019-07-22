import React, { Component } from "react";

import "../styles/App.css";
import TitleBar from "./TitleBar";
import LoginGizmo from "./Login";
import SignUpGizmo from "./SignUp";
import GameContainer from "./GameContainer";

import AppContext from '../AppContext'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: "",
      isAdmin: false,

      newUser: false,

      update: (data) => {this.setState(data)}
    };
    this.userAuthDone = this.userAuthDone.bind(this);
  }

  componentWillMount() {
    fetch("/authcheck", {
      credentials: "include"
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          isAuthenticated: result.isAuthenticated ? true : false,
          userName: result.userName,
          isAdmin: result.isAdmin ? true : false
        });
      });
  }

  userAuthDone(newState) {
    this.setState(newState);
  }

  render() {
    let content;

    if (this.state.isAuthenticated) {
      content = <GameContainer />;
    } else {
      if (this.state.newUser) {
        content = <SignUpGizmo />;
      } else {
        content = <LoginGizmo authChange={this.userAuthDone} />;
      }
    }

    return (
      <div className="App">
        <AppContext.Provider value={this.state}>
          <TitleBar title={"pew"} />
          {content}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
