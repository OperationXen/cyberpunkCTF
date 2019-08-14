import * as ActionTypes from "actions/actionTypes";

export function fetchGameState(response) {
    return {type: ActionTypes.FETCH_GAME_STATE, response};
}

export function openChallenge(data) {
  return { type: ActionTypes.OPEN_CHALLENGE, challengeID: data };
}

export function closeChallenge() {
  return { type: ActionTypes.CLOSE_CHALLENGE };
}