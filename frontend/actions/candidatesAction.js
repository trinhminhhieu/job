import axios from "axios";

import {
  ALL_CANDIDATES_REQUEST,
  ALL_CANDIDATES_SUCCESS,
  ALL_CANDIDATES_FAIL,
  ADMIN_CANDIDATES_REQUEST,
  ADMIN_CANDIDATES_SUCCESS,
  ADMIN_CANDIDATES_FAIL,
  CLEAR_ERRORS,
} from "../constants/candidatesConstants";

// "proxy": {
//   "/api/v1/*": {
//     "target": "http://127.0.0.1:4000"
//   }
// },

export const getPostjob = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CANDIDATES_REQUEST });

    //NOTE CONNECT BACKEND SERVER
    const { data } = await axios.get("http://localhost:4000/api/v1/candidates");

    console.log("data", data);
    dispatch({
      type: ALL_CANDIDATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CANDIDATES_FAIL,
      payload: error.message,
    });
  }
};

//NOTE GET CANDIDATES ADMIN
export const getCandidates = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CANDIDATES_REQUEST });

    //NOTE CONNECT BACKEND SERVER
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/admin/candidates"
    );

    console.log("data", data);
    dispatch({
      type: ADMIN_CANDIDATES_SUCCESS,
      payload: data.candidates,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CANDIDATES_FAIL,
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
