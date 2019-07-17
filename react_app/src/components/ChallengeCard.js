import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3)
  },
  valueChip: {
    position: "absolute",
    marginLeft: -theme.spacing(1.5),
    marginTop: -theme.spacing(1.5)
  },
  alignLeft: {
    textAlign: "left"
  }
}));

export default function ChallengeCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.alignLeft}>
        <Chip
          className={classes.valueChip}
          size="small"
          label={props.points ? props.points : " --- "}
          color="primary"
          avatar={
            <Avatar>
              <AddIcon />
            </Avatar>
          }
        />
      </div>
      <CardContent>
        <Typography variant="h5">{props.title}</Typography>
        <Divider />
        <Typography variant="body2">{props.slug}</Typography>
      </CardContent>
    </Card>
  );
}
