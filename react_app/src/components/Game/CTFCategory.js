import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import ChallengeCard from "components/Game/ChallengeCard";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.3)
  },
  titleText: {
    fontWeight: "bold"
  }
}));

export default function CTFCategory(props) {
  const classes = useStyles();

  if(props.category.challenges.length <= 0){
    return null
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.titleText}>
        {props.category.title}
      </Typography>
      <Divider variant="middle" />
      <Grid
        container
        spacing={3}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        {props.category.challenges.map(data => (
          <Grid item>
            <ChallengeCard key={data.id} challenge={data} />
          </Grid>
        ))}
      </Grid>
      {props.caption && props.caption.length() > 0 && (
        <div>
          <Divider variant="middle" />
          <Typography variant="caption">{props.caption}</Typography>
        </div>
      )}
    </Paper>
  );
}
