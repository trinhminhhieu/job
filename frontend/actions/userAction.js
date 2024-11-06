//TODO COPYRIGHT @2023 BY HIEUGROUP,INC
import axios from "axios";
import {
  //TODO LOGIN
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  //TODO REGISTER
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  //TODO LOAD USER
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  //NOTE LOGOUT
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  //TODO ERRORS
  CLEAR_ERRORS,
} from "../constants/userConstants";

//TODO LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    //TODO LOGIN REQUEST
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/login",
      { email, password },
      config
    );

    //TODO LOGIN SUCCESS
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//TODO REGISTER
export const register = (userData) => async (dispatch) => {
  try {
    //TODO REGISTER REQUEST
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "CONTENT-TYPE": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/register",
      userData,
      config
    );

    //TODO REGISTER SUCCESS
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//TODO LOAD USER
export const load = (userData) => async (dispatch) => {
  try {
    //TODO REGISTER REQUEST
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "CONTENT-TYPE": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/register",
      userData,
      config
    );

    //TODO REGISTER SUCCESS
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//TODO LOGOUT USER //[x] done
export const logout = (userData) => async (dispatch) => {
  try {
    await axios.get("http://localhost:4000/api/v1/logout");

    //TODO REGISTER SUCCESS
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
