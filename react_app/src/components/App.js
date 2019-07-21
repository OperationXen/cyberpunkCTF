import React, { Component } from "react";

import AppContext from "../AppContext";

import "../styles/App.css";
import TitleBar from "./TitleBar";
import LoginGizmo from "./Login";
import SignUpGizmo from "./SignUp";
import GameContainer from "./GameContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: "",
      isAdmin: false
    };
    this.userAuthDone = this.userAuthDone.bind(this);
  }

  componentDidMount() {
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
      content = <SignUpGizmo />;
      //content = <LoginGizmo authChange={this.userAuthDone} />;
    }

    return (
      <div className="App">
        <AppContext.Provider value={this.state}>
          <TitleBar title={"pew"} authenticated={this.state.isAuthenticated} />
          {content}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
