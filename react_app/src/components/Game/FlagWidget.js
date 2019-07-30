import React from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import FlagWidgetAdornmentIcon from "components/Game/FlagWidgetAdornment"

import "styles/FlagWidget.css";

class FlagWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answerOK: true,
      submitted: false,

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

  isDisabled() {
    return(this.state.answerOK || this.state.submitted)
  }

  getLabel() {
    if(this.state.answerOK === true) {
      return("Solution Accepted")
    }
    return("Flag")
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
            label={() => this.getLabel}
            placeholder={flag.guide ? flag.guide : "Flag"}
            disabled={() => this.isDisabled}
            onChange={() => this.handleChange}
            variant="outlined"
            style={this.state.answerOK ? {backgroundColor: "#00880020"} : { borderRadius: "5px 0px 0px 5px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.submitFlag}
                    disabled={this.submitAvailable}
                  >
                    <FlagWidgetAdornmentIcon correct={this.state.answerOK} submitted={this.state.submitted}/>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        {this.state.message && <Typography>{this.state.message}</Typography>}
      </div>
    );
  }
}

export default FlagWidget;
