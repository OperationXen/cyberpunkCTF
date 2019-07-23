import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { GameContext } from "../Context";

import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";

import FlagWidget from "./Flag";

const styles = makeStyles(theme => ({
  root: {
    width: "60%",
    height: "80%",
    padding: theme.spacing()
  }
}));

class ChallengeWidget extends React.Component {
  static contextType = GameContext;

  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.context.close()
  }

  render() {
    const challenge = this.props.details;

    return (
      <div>
        <Dialog onClose={this.handleClose} aria-labelledby="challenge-dialog" className={styles.root} open={true}>
          <DialogTitle id="challenge-dialog-title" onClose={this.handleClose}>
            {challenge.title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom id="challenge-dialog-content">
              {challenge.content}
            </Typography>
          </DialogContent>
          <DialogActions>Actions go here</DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ChallengeWidget;
