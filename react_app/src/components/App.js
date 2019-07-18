import React, { Component } from "react";
import logo from "../logo.svg";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

import Zoom from "@material-ui/core/Zoom";

import "../styles/App.css";
import TitleBar from "./TitleBar";
import LoginGizmo from "./Login";
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
      content = <LoginGizmo authChange={this.userAuthDone} />;
    }

    return (
      <div className="App">
        <TitleBar title={"pew"} authenticated={this.state.isAuthenticated} />

        {content}
      </div>
    );
  }
}

export default App;
