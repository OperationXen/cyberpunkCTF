import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { TextField } from "material-ui";

import "styles/FlagWidget.css"

class FlagWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagtext: "",
      message: ""
    };

    this.submitFlag = this.submitFlag.bind(this);
    this.submitAvailable = this.submitAvailable.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, message: "" });
  }

  submitFlag(event) {
    // insert graphql mutation call here
  }

  submitAvailable() {}

  render() {
    return (
      <div>
        <TextField
          id="outlined-flag-input"
          name="flagInput"
          className="flag-input"
          variant="outlined"
          type="text"
          label="Flag"
          disabled={!this.submitAvailable}
          helperText={this.props.guide ? this.props.guide : "Flag"}
          onChange={this.handleChange}
        />
        <Button
          id="flag-submit"
          name="flagSubmit"
          type="submit"
          onSubmit={this.submitFlag}
        />
        {this.state.message && <Typography>{this.state.message}</Typography>}
      </div>
    );
  }
}

export default FlagWidget;
