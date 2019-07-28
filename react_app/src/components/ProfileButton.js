import React, { Component } from "react";

import AppContext from "Context";

import Button from "@material-ui/core/Button";

class ProfileButton extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    /**
     * You keep doing this in your class consructors. So, this is one
     * approach to making sure you don't lose context, another is to do
     * this;
     *
     * onClick={() => this.existingUser}
     *
     * ^^ then you won't need these 'bind' lines.
     */
    this.existingUser = this.existingUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.doLogOut = this.doLogOut.bind(this);
  }

  /* When existing user wants to log in not register */
  existingUser() {
    // I see the pattern you're going for here - you should look into the
    // useReducer hook. Basically it's exactly the pattern you've got
    // here, but slightly more idiomatic.
    this.context.update({ newUser: false });
  }

  /* New user wishes to sign up */
  newUser() {
    this.context.update({ newUser: true });
  }

  doLogOut() {
    /**
     * scattering fetches like this around your components won't scale.
     * what you want to do is look to creating a "services" folder and
     * put them in there, so this code would then just be;
     *
     *   doLogOut() {
     *      ctfService.logout()
     *   }
     *
     */
    fetch("/logout", {
      method: "POST",
      credentials: "include"
    });
    // not waiting for the logout request to succeed first?
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
