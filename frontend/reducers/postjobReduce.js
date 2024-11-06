import {
  ALL_POSTJOB_REQUEST,
  ALL_POSTJOB_SUCCESS,
  ALL_POSTJOB_FAIL,
  CLEAR_ERRORS,
} from "../constants/postjobConstants";

export const postjobReduce = (state = { postjob: [] }, action) => {
  switch (action.type) {
    case ALL_POSTJOB_REQUEST:
      return {
        loading: true,
        postjob: [],
      };

    case ALL_POSTJOB_SUCCESS:
      return {
        loading: false,
        postjob: action.payload.postjob,
        postjobCount: action.payload.postjobCount,
        // resPerPage: action.payload.resPerPage,
        // filteredProductsCount: action.payload.filteredProductsCount,
      };

    case ALL_POSTJOB_FAIL:
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
