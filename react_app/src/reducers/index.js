import { combineReducers } from "redux";
import authReducers from "reducers/auth.reducers";
import gameReducers from "reducers/game.reducers";
import flagReducers from "reducers/flag.reducers";

// Combine multiple reducer functions for one state representation
export default combineReducers({
  auth: authReducers,
  flag: flagReducers,
  game: gameReducers
});
