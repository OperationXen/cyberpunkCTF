import GameContainer from "components/Game/GameContainer";
import SignUpGizmo from "components/Auth/SignUp";
import LoginGizmo from "components/Auth/Login";
import { connect } from "react-redux";

import React from "react";

const AppDisplay = ({ isAuthenticated, newUser }) => {
  if (isAuthenticated) return <GameContainer />;

  if (newUser) {
    return <SignUpGizmo />;
  } else {
    return <LoginGizmo />;
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  newUser: state.auth.newUser
});

export default connect(mapStateToProps)(AppDisplay);
