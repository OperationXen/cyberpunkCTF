import React, { Component } from "react";

import AppContext from "Context";

import Button from "@material-ui/core/Button";

class ProfileButton extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.existingUser = this.existingUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.doLogOut = this.doLogOut.bind(this);
  }

  /* When existing user wants to log in not register */
  existingUser() {
    this.context.update({ newUser: false });
  }

  /* New user wishes to sign up */
  newUser() {
    this.context.update({ newUser: true });
  }

  doLogOut() {
    fetch("/logout", {
      method: "POST",
      credentials: "include"
    });
    this.context.update({
      isAuthenticated: false,
      userName: "",
      isAdmin: false
    });
  }

  render() {
    if (!this.context.isAuthenticated) {
      if (this.context.newUser) {
        return (
          <Button color="inherit" onClick={this.existingUser}>
            Log In
          </Button>
        );
      } else {
        return (
          <Button color="inherit" onClick={this.newUser}>
            Register
          </Button>
        );
      }
    } else {
      return (
        <Button color="inherit" onClick={this.doLogOut}>
          Logout
        </Button>
      );
    }
  }
}

export default ProfileButton;