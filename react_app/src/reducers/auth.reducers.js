import * as ActionTypes from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  userName: "",
  isAdmin: false,
  newUser: false,
  errorMessage: null
};

/**
 * action creators
 */

/**
 * reducers
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHECK_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAdmin: !!action.response.isAdmin,
        isAuthenticated: !!action.response.isAuthenticated,
        userName: action.response.userName,
        errorMessage: null
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        userName: action.response.userName,
        isAdmin: action.response.isAdmin
      };

    case ActionTypes.LOGIN_FAILED:
      return {
        ...initialState,
        errorMessage: action.error
      };

    case ActionTypes.UPDATE_NEW_USER:
      return {
        ...state,
        newUser: action.payload
      };

    case ActionTypes.CHECK_AUTHENTICATION_FAILED:
    case ActionTypes.LOGOUT:
      // user auth failed, back to initial state
      return initialState;

    default:
      return state;
  }
};
