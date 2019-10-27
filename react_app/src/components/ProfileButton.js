import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import Button from "@material-ui/core/Button";
import { logout, updateNewUser } from "actions/auth.actions";
import { connect } from "react-redux";

class ProfileButton extends React.Component {
  constructor(props) {
    super(props);

    this.existingUser = this.existingUser.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  /* When existing user wants to log in not register */
  existingUser() {
    this.props.history.push("/login");
    //this.props.updateNewUser(false);
  }

  /* New user wishes to sign up */
  newUser() {
    this.props.history.push("/register");
    //this.props.updateNewUser(true);
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <Switch>
          <Route path="/login">
            <Button color="inherit" onClick={this.newUser}>
              Register Account
            </Button>
          </Route>
          <Route path="/register">
            <Button color="inherit" onClick={this.existingUser}>
              Login Existing User
            </Button>
          </Route>
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      );
    } else {
      return (
        <Button color="inherit" onClick={() => this.props.logout()}>
          Logout
        </Button>
      );
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  newUser: state.auth.newUser
});

const mapDispatchToProps = dispatch => ({
  updateNewUser: val => dispatch(updateNewUser(val)),
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfileButton)
);
