import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import ChallengeCard from "components/Game/ChallengeCard";

const GET_ALL_CHALLENGES_QUERY = gql`
  query Challenges($cat: String) {
    allChallenges(category: $cat) {
      id
      title
      points
      slug
      solves
    }
  }
`;

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
        <Query
          query={GET_ALL_CHALLENGES_QUERY}
          variables={{ cat: props.category.title }}
          pollInterval={45000}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;

            return data.allChallenges.map(challenge => (
              <Grid item>
                <ChallengeCard key={challenge.id} challenge={challenge} />
              </Grid>
            ));
          }}
        </Query>
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