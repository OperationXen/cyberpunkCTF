import React from "react";
import { makeStyles } from "@material-ui/core/styles"

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import FlagWidget from "./Flag";

const styles = makeStyles(theme => ({
  root: {
    width: "50%",
    height: "80%",
    padding: theme.spacing()
  }
}));

class ChallengeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className={styles.root}>
        <Typography variant="h5">{this.props.title}</Typography>
        <Divider variant="middle" />
        <div className="challenge-text-area">{this.props.content}</div>

        <Grid container direction="column" justify="center" alignItems="center">
          {/*this.props.challenge.flags.map(flag => (
            <Grid item>
              <FlagWidget key={flag.id} flag={flag} />
            </Grid>
          ))*/}
          <FlagWidget key={1} />
        </Grid>
      </Container>
    );
  }
}

export default ChallengeWidget;
