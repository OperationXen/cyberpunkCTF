import appReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = compose(
  applyMiddleware(thunk),
  devtools || (a => a)
);

const store = createStore(appReducer, middlewares);

export default store;
