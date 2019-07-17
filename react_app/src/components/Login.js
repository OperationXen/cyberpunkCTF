import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Zoom from "@material-ui/core/Zoom";

import "../styles/Login.css";

class LoginGizmo extends Component {
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
    }).then(response => {
      if (response.status == 200) {
        alert("logged in");
      } else {
        response.json().then(response => {
          this.setState({ password: "", message: response.message });
        });
      }
    });
  }

  render() {
    return (
      <Zoom in={true}>
        <Container maxWidth="sm" className="LoginWidget">
          <Paper>
            <div className="LoginBanner">
              <Typography variant="h5">Authentication Required</Typography>
            </div>
            <Divider variant="middle" />

            <form onSubmit={this.handleSubmit} className="LoginForm">
              <TextField
                className="inputField"
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
                className="inputField"
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
              {this.state.message && (
                <Typography variant="caption" color="error">
                  {this.state.message}
                </Typography>
              )}
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
