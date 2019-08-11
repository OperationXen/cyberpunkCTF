import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { GameContext } from "Context";

import Grid from "@material-ui/core/grid";

import ChallengeWidget from "components/Game/ChallengeWidget";
import CTFCategory from "components/Game/CTFCategory";

import "styles/GameContainer.css";

const GET_ALL_CATEGORIES_QUERY = gql`
  {
    allCategories {
      id
      title
      order
      background
      challenges {
        id
        title
        points
        slug
        solves
      }
    }
  }
`;

const GET_CHALLENGE_DETAIL = gql`
  query Challenge($id: Int) {
    challenge(id: $id) {
      title
      slug
      image

      content
      solves
      points

      flags {
        id
        title
        guide
        attempts
      }

      hints {
        id
        title
        upfrontCost
        deferredCost

        image
        file
        content
        prerequisites {
          id
          title
        }
      }
      category {
        id
        title
      }
      prerequisites {
        id
        title
      }
      unlockDelay
    }
  }
`;

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="game-container">
        <Grid
          container
          spacing={3}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Query query={GET_ALL_CATEGORIES_QUERY} pollInterval={60000}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>;
              if (error) return <div>Error</div>;

              return data.allCategories.map(data => (
                <Grid item>
                  <CTFCategory key={data.id} category={data} />
                </Grid>
              ));
            }}
          </Query>
        </Grid>
        {this.props.challengeDetail != null && (
          <Query
            query={GET_CHALLENGE_DETAIL}
            variables={{ id: this.props.challengeDetail }}
          >
            {({ loading, error, data }) => {
              if (loading) return <div>"..."</div>;
              if (error) return <div>"Error"</div>;

              console.log(data);
              return <ChallengeWidget details={data.challenge} />;
            }}
          </Query>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  challengeDetail: state.game.viewingChallenge
});

export default connect(
  mapStateToProps,
  null
)(GameContainer);
