import * as ActionTypes from "./actionTypes";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const FLAG_SUBMISSION_MUTATION = gql`
  mutation FlagSubmission($id: Int!, $flag: String!) {
    submitflag(id: $id, submission: $flag) {
      result {
        correct
        value
        first
      }
    }
  }
`;

function submitFlag(flagID, flagAttempt) {
  return(
    <Mutation mutation={FLAG_SUBMISSION_MUTATION}>
        {(submitflag, {data, error, loading})} => {
            //
        }
    </Mutation>
  ) 
}
