import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "material-ui/styles/typography";

import FlagWidget from "./Flag";

class Challenge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Typography variant="h5">{this.props.title}</Typography>
        <Divider variant="middle" />
        <div className="challenge-text-area">{this.props.flag.challenge}</div>

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        {challenge.flags.map(flag => (
          <GridItem>
            <FlagWidget key={flag.id} flag={flag} />
          </GridItem>
        ))}
        </Grid>
      </Container>
    );
  }
}
