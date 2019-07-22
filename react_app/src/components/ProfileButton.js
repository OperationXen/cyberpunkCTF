import React, { Component } from "react";

import AppContext from "./App";

import Button from "@material-ui/core/Button";

class ProfileButton extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    console.log(this.context)

    this.existingUser = this.existingUser.bind(this);
    this.newUser = this.newUser.bind(this)
    this.doLogOut = this.doLogOut.bind(this);
  }

  /* When existing user wants to log in not register */
  existingUser() {
      console.log(this.context.userName)
      //this.context.update({newUser: false})
  }

  /* New user wishes to sign up */
  newUser() {
    console.log(this.context.userName)
    //this.context.update({newUser: true})
  }

  doLogOut() {
    fetch("/logout", {
      method: "POST",
      credentials: "include"
    });
  }

  render() {
    console.log(this.context);
    if (!this.context.isAuthenticated) {
      if (this.context.newUser) {
        return <Button color="inherit" onClick={this.existingUser}>Log In</Button>;
      } else {
        return <Button color="inherit" onClick={this.newUser}>Register</Button>;
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
