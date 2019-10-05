import React from "react";
import { connect } from "react-redux"

import { submitFlag } from "actions/flag.actions"

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import FlagWidgetAdornment from "components/Game/FlagWidgetAdornment";

import "styles/FlagWidget.css";

class FlagWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answerOK: null,
      submitted: false,

      flagtext: "",
      message: ""
    };

    this.keyPressed = this.keyPressed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitAvailable = this.submitAvailable.bind(this);
    this.submitFlag = this.submitFlag.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.getLabel = this.getLabel.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, submitted: false, message: "" });
  }

  submitFlag(event) {
    this.props.submitFlag(this.props.flag.id, this.state.flagtext);
    this.setState({submitted: true})
  }

  isDisabled() {
    return this.state.answerOK || this.state.submitted;
  }

  getLabel() {
    if (this.state.answerOK === true) {
      return "Solution Accepted";
    }
    return "Flag";
  }

  keyPressed(event){
    if(event.key === "Enter" && this.submitAvailable()) {
      this.submitFlag()
    }
  }

  submitAvailable() {
    if (this.state.flagtext.length < 3 || this.isDisabled()) {
      return false;
    }
    return true;
  }

  render() {
    const flag = this.props.flag;

    if (flag === undefined) {
      return null;
    }

    return (
      <div className="flagwidget">
        <div className="flagwidget-input">
          <TextField
            fullWidth
            id="flag-input"
            name="flagtext"
            label={this.getLabel()}
            placeholder={flag.guide ? flag.guide : "Flag"}
            disabled={this.isDisabled()}
            onChange={this.handleChange}
            onSubmit={this.submitFlag}
            onKeyPress={this.keyPressed}
            value={this.state.flagtext}
            variant="outlined"
            style={
              this.state.answerOK
                ? { backgroundColor: "#00880020" }
                : { borderRadius: "5px 0px 0px 5px" }
            }
            InputProps={{
              endAdornment: (
                <FlagWidgetAdornment
                  action={this.submitFlag}
                  active={this.submitAvailable()}
                  correct={this.state.answerOK}
                  submitted={this.state.submitted}
                />
              )
            }}
          />
          {this.state.message && (
            <div className="flagwidget-message">
              <Typography variant="caption">{this.state.message}</Typography>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    submitFlag: (id, data) => { dispatch(submitFlag(id, data)) }
  }
}

export default connect(null, mapDispatchToProps)(FlagWidget);
