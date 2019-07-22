import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import App from "./components/App";
import apolloClient from "./Apollo";
import cyberpunkTheme from "./Theme";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <MuiThemeProvider theme={cyberpunkTheme}>
      
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
