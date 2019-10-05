import * as ActionTypes from "actions/actionTypes";

const initialState = {
  correct: false,
  incorrect: false,
  value: false,
  solves: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUBMIT_FLAG_SUCCESS: {
      alert("success!");
      return {
        ...state
        // state change
      };
    }

    case ActionTypes.SUBMIT_FLAG_FAILURE: {
      alert("failed");
      return {
        ...state
        // stufuf
      };
    }

    default: {
      return { ...state };
    }
  }
};
