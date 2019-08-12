import React from "react";

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
    this.props.updateNewUser(false);
  }

  /* New user wishes to sign up */
  newUser() {
    this.props.updateNewUser(true);
  }

  render() {
    if (!this.props.isAuthenticated) {
      if (this.props.newUser) {
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileButton);
