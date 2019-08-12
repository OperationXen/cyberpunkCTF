import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

class PlayerDetails extends Component {
  constructor(props) {
    super(props);
  }

  getUserName() {
    return this.props.userName;
  }
  getTeamName() {
    if (this.props.teamName) {
      return "[" + this.props.teamName + "]";
    }
    return "Solo";
  }

  render() {
    if (!this.props.isAuthenticated) {
      return null;
    }
    return (
      <Button color="inherit">
        {this.getUserName()} - {this.getTeamName()}
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  teamName: state.game.teamName
});

export default connect(mapStateToProps)(PlayerDetails);
