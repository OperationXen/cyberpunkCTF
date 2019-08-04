import { combineReducers } from "redux";
import authReducers from "./auth.reducers";

export default combineReducers({
  auth: authReducers
});
