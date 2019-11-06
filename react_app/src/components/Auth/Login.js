import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import { connect } from "react-redux";
import { login } from "actions/auth.actions";

import "styles/Login.css";

class LoginGizmo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(new FormData(event.target));
  }

  messageContents() {
    if (this.props.authErrorMessage) {
      return (
        <div>
          <Typography variant="caption" color="error">
            {this.props.authErrorMessage}
          </Typography>
        </div>
      );
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <Zoom in={!this.props.isAuthenticated}>
        <Container maxWidth="sm">
          <Paper className="login-gizmo" elevation={12}>
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

const mapStateToProps = state => ({
  authErrorMessage: state.auth.errorMessage,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  login: formData => dispatch(login(formData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginGizmo);
