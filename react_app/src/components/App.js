import React, { Component } from "react";

import AppContext from "Context";

import GameContainer from "components/Game/GameContainer";
import SignUpGizmo from "components/Auth/SignUp";
import TitleBar from "components/TitleBar";
import LoginGizmo from "components/Auth/Login";

import "styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: "",
      isAdmin: false,

      newUser: false,

      update: data => {
        this.setState(data);
      }
    };
    this.userAuthDone = this.userAuthDone.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
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
        content = <LoginGizmo />;
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
