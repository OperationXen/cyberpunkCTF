import React, { Component } from "react";

import AppContext from "Context";

import TitleBar from "components/TitleBar";
import AppDisplay from "./AppDisplay";

import store from "../store";
import { Provider as ReduxProvider } from "react-redux";
import { checkAuthentication } from "../actions";

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

  componentWillMount() {
    store.dispatch(checkAuthentication());
  }

  render() {
    return (
      <div className="App">
        <ReduxProvider store={store}>
          <AppContext.Provider value={this.state}>
            <TitleBar title={"pew"} />
            <AppDisplay />
          </AppContext.Provider>
        </ReduxProvider>
      </div>
    );
  }
}

export default App;
