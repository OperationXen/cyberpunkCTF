import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";
import { withStyles } from "@material-ui/core/styles";
import "../styles/components/titlebar.css";

const styles = theme => ({
  titleBar: {
    backgroundColor: pink[300]
  }
});

const TitleBar = ({ classes }) => {
  return (
    <AppBar className={classes.titleBar}>
      <Typography>Pew</Typography>
    </AppBar>
  );
};

export default withStyles(styles)(TitleBar);
