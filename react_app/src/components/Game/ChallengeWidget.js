import React from "react";

import { GameContext } from "Context";

import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";

import FlagWidget from "components/Game/Flag";

import "styles/ChallengeWidget.css"

class ChallengeWidget extends React.Component {
  static contextType = GameContext;

  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.context.close();
  }

  render() {
    const challenge = this.props.details;

    return (
      <div className= "challenge-display">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="challenge-dialog"
          PaperProps={{ className: "challenge-widget" }}
          open={true}
        >
          <DialogTitle id="challenge-dialog-title" onClose={this.handleClose}>
            {challenge.title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom id="challenge-dialog-content">
              {challenge.content}
            </Typography>
          </DialogContent>
          <FlagWidget flag={challenge.flags[0]}></FlagWidget>
          <DialogActions>Actions go here</DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ChallengeWidget;
