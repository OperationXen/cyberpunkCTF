import { combineReducers } from "redux";
import authReducers from "./auth.reducers";

// Combine multiple reducer functions for one state representation
export default combineReducers({
  auth: authReducers
});
