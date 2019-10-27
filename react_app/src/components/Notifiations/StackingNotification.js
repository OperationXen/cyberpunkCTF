import React, { Component } from "react";

import { amber, green } from "@material-ui/core/colors";
import { Typography, Button, IconButton } from "@material-ui/core";
import { Slide } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
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
        style={{ backgroundColor: "green" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.open}
        autoHideDuration={10000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            <Typography>{this.props.message}</Typography>
          </span>
        }
        action={[
          <Button
            key="more"
            color="secondary"
            size="small"
            onClick={this.handleClose}
          >
            MORE
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={""}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

export default StackingNotification;
