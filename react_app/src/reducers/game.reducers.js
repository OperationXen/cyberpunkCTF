import * as ActionTypes from "actions/actionTypes";

const initialState = {
  teamName: "",
  teamScore: 0,
  teamRank: false,
  viewingChallenge: null
};

/**
 * action creators
 */

/**
 * reducers
 */
/* state param takes default of initialState if not otherwise set */
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_GAME_STATE:
      return {
        ...state,                               // unpack state
        teamName: action.response.teamName,     // override those things that are set
        teamScore: action.response.teamScore,
        teamRank: action.response.teamRank,
        viewingChallenge: null
      };
    case ActionTypes.OPEN_CHALLENGE:
        return {
            ...state,
            viewingChallenge: action.challengeID
        };
    case ActionTypes.CLOSE_CHALLENGE:
        return {
            ...state,
            viewingChallenge: null
        };
    default:
        return state;
    }
}