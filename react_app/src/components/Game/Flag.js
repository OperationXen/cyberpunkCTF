import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "styles/FlagWidget.css";

class FlagWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagtext: "",
      message: ""
    };

    this.submitFlag = this.submitFlag.bind(this);
    this.submitAvailable = this.submitAvailable.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, message: "" });
  }

  submitFlag(event) {
    // insert graphql mutation call here
  }

  submitAvailable() {}

  render() {
    const flag = this.props.flag;

    if (flag == undefined) {
      return null;
    }

    return (
      <div className="flagwidget">
        <div className="flagwidget-input">
          <TextField
            fullWidth
            id="flag-input"
            name="flagInput"
            label="Flag"
            placeholder={flag.guide ? flag.guide : "Flag"}
            disabled={!this.submitAvailable}
            onChange={this.handleChange}
            variant="outlined"
          />
        </div>
        <div className="flagwidget-button">
          <Button
            fullWidth
            id="flag-submit"
            name="flagSubmit"
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            style={{height: "3.5em"}}
            onSubmit={this.submitFlag}
          >
            Submit
          </Button>
        </div>
        {this.state.message && <Typography>{this.state.message}</Typography>}
      </div>
    );
  }
}

export default FlagWidget;
