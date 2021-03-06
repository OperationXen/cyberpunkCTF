import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";

import ProfileButton from "components/ProfileButton";
import PlayerDetails from "components/Misc/PlayerDetails";

import StackingNotification from "components/Notifiations/StackingNotification";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function TitleBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StackingNotification message="Pew pew" />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <PlayerDetails />
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>

          <ProfileButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
