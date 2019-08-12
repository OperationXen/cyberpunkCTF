import * as ActionTypes from "actions/actionTypes";
import ctfApolloClient from "Services/Network/CTFApolloClient"
import gql from "graphql-tag";

export function fetchGameState(response) {
    return {type: ActionTypes.FETCH_GAME_STATE, response};
}

export function openChallenge(data) {
  return { type: ActionTypes.OPEN_CHALLENGE, challengeID: data };
}

export function closeChallenge() {
  return { type: ActionTypes.CLOSE_CHALLENGE };
}

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
  ctfApolloClient
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
