import React, { Component } from "react";

import AppContext from "Context";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

import "styles/Login.css";

class LoginGizmo extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, message: "" });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch("/login", {
      method: "POST",
      credentials: "include",
      body: new FormData(event.target)
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(response => {
            this.context.update({
              isAuthenticated: true,
              userName: response.userName,
              isAdmin: response.isAdmin
            });
          });
        } else if (response.status == 500) {
          this.setState({ message: "The server encountered an error" });
        } else {
          response.json().then(response => {
            this.setState({ password: "", message: response.message });
          });
        }
      })
      .catch(error => {
        this.setState({ message: "Unable to connect to server" });
      });
  }

  messageContents() {
    if (this.state.message) {
      return (
        <div>
          <Typography variant="caption" color="error">
            {this.state.message}
          </Typography>
        </div>
      );
    }
  }

  render() {
    const message = this.messageContents();

    return (
      <Zoom in={true}>
        <Container maxWidth="sm">
          <Paper className="login-gizmo">
            <div className="login-banner">
              <Typography variant="h5">Authentication Required</Typography>
            </div>
            <Divider variant="middle" />

            <form onSubmit={this.handleSubmit} className="LoginForm">
              <TextField
                autoFocus
                className="input-field"
                id="outlined-username-input"
                name="userName"
                label="Username / eMail"
                type="text"
                autoComplete="username"
                margin="normal"
                variant="outlined"
                value={this.state.userName}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                className="input-field"
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <br />
              {this.messageContents()}
              <br />
              <Button
                color="primary"
                variant="contained"
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Zoom>
    );
  }
}

export default LoginGizmo;
