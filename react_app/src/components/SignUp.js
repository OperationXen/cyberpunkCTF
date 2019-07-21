import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../styles/SignUp.css"

import Zoom from "@material-ui/core/Zoom";

class SignUpGizmo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",

      usernameFeedback: "",
      emailFeedback: "",
      passwordFeedback: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleeMailChange = this.handleeMailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(event) {
    if(this.state.password1 == "" || this.state.password2 == ""){
      return(false)
    }
    return true;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUserNameChange(event){
    this.setState({ 
      [event.target.name]: event.target.value,
      usernameFeedback: ""
     });
  }

  handleeMailChange(event){
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

    if(this.state.password1 != this.state.password2){
      this.setState({"message": "Passwords do not match..."})
      return false
    }

    fetch("/signup", {
      method: "POST",
      credentials: "include",
      body: new FormData(event.target)
    }).then(response => {
      if (response.status == 200) {
        alert("logged in");
      } else {
        response.json().then(response => {
          if(response.username){
            let usernameErrors = ""
            for (var key in response.username) {
              usernameErrors += response.username[key] + " \n"
            }
            this.setState( { usernameFeedback: usernameErrors })
          }

          if(response.email){
            let emailErrors = ""
            for (var key in response.email) {
              emailErrors += response.email[key] + " \n"
            }
            this.setState( { emailFeedback: emailErrors })
          }

          if(response.password2){
            let passwordErrors = ""
            for (var key in response.password2) {
              passwordErrors += response.password2[key] + " \n"
            }
            this.setState({ passwordFeedback: passwordErrors });
          }
        });
      }
    });
  }

  render() {
    return (
      <Zoom in={true}>
        <Container maxWidth="sm" className="SignUpGizmo">
          <Paper>
            <div className="SignUpBanner">
              <Typography variant="h5">Register Account</Typography>
            </div>
            <Divider variant="middle" />

            <form onSubmit={this.handleSubmit} className="SignUpForm">
              <TextField
                required
                className="inputField"
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
                className="inputField"
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
                className="inputField"
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
                className="inputField"
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

export default SignUpGizmo;
