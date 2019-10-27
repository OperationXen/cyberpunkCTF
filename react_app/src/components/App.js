import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "Context";

import TitleBar from "components/TitleBar";
import AppDisplay from "./AppDisplay";

import store from "../store";
import { Provider as ReduxProvider } from "react-redux";
import { checkAuthentication } from "actions/auth.actions";

import "styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: data => {
        this.setState(data);
      }
    };
  }

  // at app load, check the current user's auth status
  componentDidMount() {
    store.dispatch(checkAuthentication());
  }

  render() {
    return (
      <div className="App">
        <ReduxProvider store={store}>
          <AppContext.Provider value={this.state}>
            <Router>
              <TitleBar title={"pew"} />
              <AppDisplay />
            </Router>
          </AppContext.Provider>
        </ReduxProvider>
      </div>
    );
  }
}

export default App;
