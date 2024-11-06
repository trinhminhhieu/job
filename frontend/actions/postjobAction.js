import axios from "axios";

import {
  ALL_POSTJOB_REQUEST,
  ALL_POSTJOB_SUCCESS,
  ALL_POSTJOB_FAIL,
  CLEAR_ERRORS,
} from "../constants/postjobConstants";

// "proxy": {
//   "/api/v1/*": {
//     "target": "http://127.0.0.1:4000"
//   }
// },

export const getPostjob = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_POSTJOB_REQUEST });

    //NOTE CONNECT BACKEND SERVER
    const { data } = await axios.get("http://localhost:4000/api/v1/postjob");

    console.log("data", data);
    dispatch({
      type: ALL_POSTJOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_POSTJOB_FAIL,
      payload: error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
