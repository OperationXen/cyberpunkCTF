import React from "react";

import { GameContext } from "Context";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";

import "styles/ChallengeCard.css";

class ChallengeCard extends React.Component {
  static contextType = GameContext;

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // Bad function name :(
  handleClick() {
    this.context.open(this.props.challenge.id);
  }

  render() {
    // save those money-makers :)
    const { challenge } = this.props;

    return (
      <Card className="challenge-card" onClick={this.handleClick}>
        <div className="align-left">
          <Chip
            className="value-chip"
            size="small"
            label={challenge.points ? challenge.points : " --- "}
            color="primary"
            avatar={
              <Avatar>
                <AddIcon />
              </Avatar>
            }
          />
        </div>
        <CardContent>
          <Typography variant="h5">{challenge.title}</Typography>
          <Divider />
          <Typography variant="body2">{challenge.slug}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ChallengeCard;
