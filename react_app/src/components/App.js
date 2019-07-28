import React, { Component } from "react";

import AppContext from "Context";

import GameContainer from "components/Game/GameContainer";
import SignUpGizmo from "components/Auth/SignUp";
import TitleBar from "components/TitleBar";
import LoginGizmo from "components/Auth/Login";

import "styles/App.css";

// you should if possible try to avoid classes since 16.8 came out,
// there is no reason to use them and there are benefits to not.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: "",
      isAdmin: false,

      newUser: false,

      /**
       * don't put functions in your state! I am guessing that
       * the intention of this is that you want to store the whole
       * app state here in App.js, pass that into Context AS WELL AS
       * passing a way to update it - so if you want to do that then you
       * don't need a function here, you can just do this;
       *
       *   <AppContext.Provider value={update: this.setState, ...this.state}>
       *
       * This approach isn't going to scale, but maybe you don't need it to (yet).
       * It's also really inefficient (your whole application is going to re-render
       * every time any piece of the state updates) - again, maybe that's not a
       * concern yet.
       */
      update: data => {
        this.setState(data);
      }
    };

    // This un-used?
    this.userAuthDone = this.userAuthDone.bind(this);

    // Why are you doing this?
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
    return (
      <div className="App">
        <AppContext.Provider value={this.state}>
          <TitleBar title={"pew"} />

          {
            // eventually you'll want this little chunk here to
            // go off and live in another component of its own IMO
          }
          {this.state.isAuthenticated ? (
            <GameContainer />
          ) : this.state.newUser ? (
            <SignUpGizmo />
          ) : (
            <LoginGizmo />
          )}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
