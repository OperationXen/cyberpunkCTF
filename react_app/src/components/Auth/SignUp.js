import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";
import AppContext from "Context";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";

import "styles/SignUp.css";

class SignUpGizmo extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",

      usernameFeedback: "",
      emailFeedback: "",
      passwordFeedback: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleeMailChange = this.handleeMailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(event) {
    if (this.state.password1 === "" || this.state.password2 === "") {
      return false;
    }
    return true;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUserNameChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      usernameFeedback: ""
    });
  }

  handleeMailChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      emailFeedback: ""
    });
  }

  handlePasswordChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      passwordFeedback: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.password1 !== this.state.password2) {
      this.setState({ message: "Passwords do not match..." });
      return false;
    }

    fetch("/signup", {
      method: "POST",
      credentials: "include",
      body: new FormData(event.target)
    }).then(response => {
      if (response.status === 200) {
        response.json().then(response => {
          this.context.update(response);
          this.context.update({ isAuthenticated: true });
        });
      } else {
        response.json().then(response => {
          if (response.username) {
            let usernameErrors = "";
            for (var key in response.username) {
              usernameErrors += response.username[key] + " \n";
            }
            this.setState({ usernameFeedback: usernameErrors });
          }

          if (response.email) {
            let emailErrors = "";
            for (var key in response.email) {
              emailErrors += response.email[key] + " \n";
            }
            this.setState({ emailFeedback: emailErrors });
          }

          if (response.password2) {
            let passwordErrors = "";
            for (var key in response.password2) {
              passwordErrors += response.password2[key] + " \n";
            }
            this.setState({ passwordFeedback: passwordErrors });
          }
        });
      }
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <Zoom in={true}>
        <Container maxWidth="sm" className="signup-gizmo">
          <Paper elevation={12}>
            <div className="signup-banner">
              <Typography variant="h5">Register Account</Typography>
            </div>
            <Divider variant="middle" />

            <form onSubmit={this.handleSubmit} className="signup-form">
              <TextField
                required
                className="input-field"
                id="outlined-username-input"
                name="username"
                label="Username (Public)"
                type="text"
                autoComplete="username"
                margin="normal"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleUserNameChange}
              />
              <br />
              {this.state.usernameFeedback && (
                <Typography variant="caption" color="error">
                  {this.state.usernameFeedback}
                </Typography>
              )}
              <TextField
                className="input-field"
                id="outlined-email-input"
                name="email"
                label="eMail Address"
                type="text"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                value={this.state.email}
                onChange={this.handleeMailChange}
              />
              <br />
              {this.state.emailFeedback && (
                <Typography variant="caption" color="error">
                  {this.state.emailFeedback}
                </Typography>
              )}
              <br />
              <Divider variant="middle" />
              <TextField
                className="input-field"
                id="outlined-password1-input"
                label="Password"
                type="password"
                name="password1"
                margin="normal"
                variant="outlined"
                value={this.state.password1}
                onChange={this.handlePasswordChange}
              />
              <br />
              <TextField
                className="input-field"
                id="outlined-password2-input"
                label="Password (Confirm)"
                type="password"
                name="password2"
                margin="normal"
                variant="outlined"
                value={this.state.password2}
                onChange={this.handlePasswordChange}
              />
              <br />
              {this.state.passwordFeedback && (
                <Typography variant="caption" color="error">
                  {this.state.passwordFeedback}
                </Typography>
              )}
              <br />
              <Button
                color="primary"
                variant="contained"
                disabled={!this.validateForm()}
                type="submit"
              >
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Zoom>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(SignUpGizmo);
