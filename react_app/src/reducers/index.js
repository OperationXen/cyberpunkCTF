import { combineReducers } from "redux";
import authReducers from "reducers/auth.reducers";
import gameReducers from "reducers/game.reducers"

// Combine multiple reducer functions for one state representation
export default combineReducers({
  auth: authReducers,
  game: gameReducers
});
