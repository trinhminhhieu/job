import {
  ALL_CANDIDATES_REQUEST,
  ALL_CANDIDATES_SUCCESS,
  ALL_CANDIDATES_FAIL,
  CLEAR_ERRORS,
  ADMIN_CANDIDATES_REQUEST,
  ADMIN_CANDIDATES_SUCCESS,
  ADMIN_CANDIDATES_FAIL,
  CLEAR_ERRORS,
} from "../constants/candidatesConstants";

export const candidatesReduce = (state = { candidates: [] }, action) => {
  switch (action.type) {
    case ALL_CANDIDATES_REQUEST:
    case ADMIN_CANDIDATES_REQUEST:
      return {
        loading: true,
        candidates: [],
      };

    case ALL_CANDIDATES_SUCCESS:
      return {
        loading: false,
        candidates: action.payload.candidates,
      };

    //NOTE ADMIN
    case ADMIN_CANDIDATES_SUCCESS:
      return {
        loading: false,
        candidates: action.payload,
      };

    case ALL_CANDIDATES_FAIL:
    case ADMIN_CANDIDATES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
