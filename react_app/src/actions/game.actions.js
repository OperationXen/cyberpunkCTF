import React from "react";

import * as ActionTypes from "actions/actionTypes";
import gql from "graphql-tag";

import ApolloClient from "apollo-boost";

function getGameState(response) {
    return {type: ActionTypes.GET_GAME_STATE, response};
}

function openChallenge(data) {
  return { type: ActionTypes.OPEN_CHALLENGE, data };
}

function closeChallenge(data) {
  return { type: ActionTypes.CLOSE_CHALLENGE, data };
}

const client = new ApolloClient({
  uri: "/graphql/"
});

const FLAG_SUBMISSION_MUTATION = gql`
  mutation submitflag($id: Int!, $flag: String!) {
    submitflag(id: $id, submission: $flag) {
      result {
        correct
        value
        first
      }
    }
  }
`;

export function submitFlag(flagid, flagAttempt) {
  client
    .mutate({
      mutation: FLAG_SUBMISSION_MUTATION,
      variables: { id: flagid, flag: flagAttempt }
    })
    .then(result => {
      if (result.data.submitflag.result.correct) {
        alert("correct: " + result.data.submitflag.result.value);
      } else {
        alert("incorrect");
      }
    })
    .finally();

  return;
}
