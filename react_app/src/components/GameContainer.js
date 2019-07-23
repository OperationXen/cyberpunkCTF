import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/grid";
import CTFCategory from "./CTFCategory";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import ChallengeWidget from "./ChallengeWidget";

const GET_ALL_CATEGORIES_QUERY = gql`
  {
    allCategories {
      id
      title
      order
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
       
      flags{
        id
        title
        guide
        attempts
      }

      hints{
        id
        title
        upfrontCost
        deferredCost
         
        image
        file
        content
        prerequisites{
          id
          title
        }
      }
      category{
        id
        title
      }
      prerequisites{
        id
        title
      }
      unlockDelay
    }
  }
`;

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing()
  }
}));

class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challengeDetail: null
    };
  }

  render() {
    return (
      <div className={styles.root}>
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

              return data.allCategories.map(category => (
                <Grid item lg={6}>
                  <CTFCategory key={category.id} category={category} />
                </Grid>
              ));
            }}
          </Query>
        </Grid>
        {/*this.state.challengeDetail != null */ true && (
          <Query
            query={GET_CHALLENGE_DETAIL}
            variables={{ id: 1 }}
          >
            {({ loading, error, data }) => {
              if (loading) return <div>"..."</div>;
              if (error) return <div>"Error"</div>;

              return <ChallengeWidget details={data} />;
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default GameContainer;
