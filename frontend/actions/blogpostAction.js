import axios from "axios";

import {
  ALL_BLOGPOSTS_REQUEST,
  ALL_BLOGPOSTS_SUCCESS,
  ALL_BLOGPOSTS_FAIL,
  ADMIN_BLOGPOSTS_REQUEST,
  ADMIN_BLOGPOSTS_SUCCESS,
  ADMIN_BLOGPOSTS_FAIL,
  NEW_BLOGPOST_REQUEST,
  NEW_BLOGPOST_SUCCESS,
  NEW_BLOGPOST_FAIL,
  DELETE_BLOGPOST_REQUEST,
  DELETE_BLOGPOST_SUCCESS,
  DELETE_BLOGPOST_FAIL,
  UPDATE_BLOGPOST_REQUEST,
  UPDATE_BLOGPOST_SUCCESS,
  UPDATE_BLOGPOST_FAIL,
  BLOGPOST_DETAILS_REQUEST,
  BLOGPOST_DETAILS_SUCCESS,
  BLOGPOST_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/blogpostConstants";

export const getBlogposts =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_BLOGPOSTS_REQUEST });

      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_BLOGPOSTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_BLOGPOSTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newBlogpost = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BLOGPOST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_BLOGPOST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BLOGPOST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product (Admin)
export const deleteBlogpost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOGPOST_REQUEST });

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/admin/product/${id}`
    );

    dispatch({
      type: DELETE_BLOGPOST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOGPOST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product (ADMIN)
export const updateBlogpost = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BLOGPOST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_BLOGPOST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOGPOST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBlogpostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOGPOST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: BLOGPOST_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: BLOGPOST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminBlogposts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_BLOGPOSTS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: ADMIN_BLOGPOSTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_BLOGPOSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get product reviews
export const getBlogpostReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${id}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
