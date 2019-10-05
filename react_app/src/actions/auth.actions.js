import * as ActionTypes from "actions/actionTypes";

function checkAuthenticationSuccess(response) {
  return { type: ActionTypes.CHECK_AUTHENTICATION_SUCCESS, response };
}

function checkAuthenticationFailed(error) {
  return { type: ActionTypes.CHECK_AUTHENTICATION_FAILED, error };
}

function loginSuccess(response) {
  return { type: ActionTypes.LOGIN_SUCCESS, response };
}

function loginFailed(error) {
  return { type: ActionTypes.LOGIN_FAILED, error };
}

export function updateNewUser(newUser) {
  return { type: ActionTypes.UPDATE_NEW_USER, payload: newUser };
}

export function login(formData) {
  // Thunk middleware used to enable return of function
  return async dispatch => {
    dispatch({ type: "LOGIN" });
    try {
      fetch("/login", {
        method: "POST",
        credentials: "include",
        body: formData
      })
        .then(response => response.json().then((body) => ({ body, response })))
        .then(({ body, response }) => {
          if (response.status === 200) {
            dispatch(loginSuccess(body));
          } else {
            dispatch(loginFailed(body.message));
          }
        })
        .catch(error => {
          dispatch(loginFailed("Unable to connect to server"));
        });
    } catch (err) {
      dispatch(loginFailed(err.message));
    }
  };
}

/* helper function first issues logout request, then fires the logout event to set state */
export function logout() {
  // Function wrapped uses Thunk middleware
  return async dispatch => {
    fetch("/logout", {
      method: "POST",
      credentials: "include"
    }).finally(() => {
      dispatch({ type: ActionTypes.LOGOUT });
    });
  };
}

/* issue network request and then raise event depending on result */
export function checkAuthentication() {
  // Thunk middleware allows use of function here
  return async dispatch => {
    dispatch({ type: "CHECK_AUTHENTICATION" });
    try {
      fetch("/authcheck", {
        credentials: "include"
      })
        .then(response => response.json().then(body => ({ body, response })))
        .then(({ body, response }) => {
          if (response.status === 200) {
            dispatch(checkAuthenticationSuccess(body));
          } else {
            dispatch(checkAuthenticationFailed(body.message));
          }
        });
    } catch (err) {
      dispatch(checkAuthenticationFailed(err.message));
    }
  };
}
