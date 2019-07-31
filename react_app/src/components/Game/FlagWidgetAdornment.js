import React, { Component } from "react";

import { Forward, HourglassFull, Error, Check } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { isFlowPredicate } from "@babel/types";

// Object Oriented Programming uses classes to represent objects. NOT functions.
class FlagWidgetAdornment extends Component {
  constructor(props) {
    super(props);
  }

  buttonIcon() {
    if (this.props.correct === true) {
      return <Check />;
    } else if (this.props.correct === false) {
      return <Error />;
    } else if (this.props.submitted === true) {
      return <HourglassFull />;
    }
    return <Forward />;
  }

  render() {
    return (
      <InputAdornment position="end">
        <IconButton onClick={this.props.action} disabled={!this.props.active}>
          {this.buttonIcon()}
        </IconButton>
      </InputAdornment>
    );
  }
}

export default FlagWidgetAdornment;
