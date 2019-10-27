import React, { Component } from "react";

import { amber, green } from "@material-ui/core/colors";
import { Typography, Button, IconButton } from "@material-ui/core";
import { Slide } from "@material-ui/core";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

class StackingNotification extends Component {
  constructor(props) {
    super(props);

    this.state = { open: true };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  render() {
    return (
      <Snackbar
        TransitionComponent={SlideTransition}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.open}
        autoHideDuration={10000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          aria-describedby="client-snackbar"
          message={
            <span id="stackable-message-content">{this.props.message}</span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

export default StackingNotification;
