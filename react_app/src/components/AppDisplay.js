import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import GameContainer from "components/Game/GameContainer";
import SignUpGizmo from "components/Auth/SignUp";
import LoginGizmo from "components/Auth/Login";
import { connect } from "react-redux";

import React from "react";
import GameContext from "Context";

const AppDisplay = ({ isAuthenticated }) => {
  //Present the game component to authenticated users
  return (
    //Present the relevant widget depending on path - login or register
    <Switch>
      <Route path="/login">
        <LoginGizmo />
      </Route>
      <Route path="/register">
        <SignUpGizmo />
      </Route>
      {/*If not logged in, default to pushing user to login page*/}
      <Route>
        <GameContainer />
      </Route>
    </Switch>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(AppDisplay);
