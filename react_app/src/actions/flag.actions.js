import * as ActionTypes from "actions/actionTypes";
import ctfApolloClient from "Services/Network/CTFApolloClient";
import gql from "graphql-tag";

function submitFlagSuccess(response) {
  return { type: ActionTypes.SUBMIT_FLAG_SUCCESS, response };
}

function submitFlagFailure(response) {
  return { type: ActionTypes.SUBMIT_FLAG_FAILURE, response };
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
        return (submitFlagSuccess(result.data.submitflag.result));
      } else {
        return (submitFlagFailure(result.data.submitflag.result));
      }
    })
    .finally();

  return;
}
