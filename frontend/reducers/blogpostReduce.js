import {
  ALL_BLOGPOSTS_REQUEST,
  ALL_BLOGPOSTS_SUCCESS,
  ALL_BLOGPOSTS_FAIL,
  ADMIN_BLOGPOSTS_REQUEST,
  ADMIN_BLOGPOSTS_SUCCESS,
  ADMIN_BLOGPOSTS_FAIL,
  NEW_BLOGPOST_REQUEST,
  NEW_BLOGPOST_SUCCESS,
  NEW_BLOGPOST_RESET,
  NEW_BLOGPOST_FAIL,
  DELETE_BLOGPOST_REQUEST,
  DELETE_BLOGPOST_SUCCESS,
  DELETE_BLOGPOST_RESET,
  DELETE_BLOGPOST_FAIL,
  UPDATE_BLOGPOST_REQUEST,
  UPDATE_BLOGPOST_SUCCESS,
  UPDATE_BLOGPOST_RESET,
  UPDATE_BLOGPOST_FAIL,
  BLOGPOST_DETAILS_REQUEST,
  BLOGPOST_DETAILS_SUCCESS,
  BLOGPOST_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
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

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_BLOGPOSTS_REQUEST:
    case ADMIN_BLOGPOSTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_BLOGPOSTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case ADMIN_BLOGPOSTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ALL_BLOGPOSTS_FAIL:
    case ADMIN_BLOGPOSTS_FAIL:
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

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_BLOGPOST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_BLOGPOST_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case NEW_BLOGPOST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_BLOGPOST_RESET:
      return {
        ...state,
        success: false,
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

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOGPOST_REQUEST:
    case UPDATE_BLOGPOST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BLOGPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_BLOGPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_BLOGPOST_FAIL:
    case UPDATE_BLOGPOST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_BLOGPOST_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_BLOGPOST_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case BLOGPOST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case BLOGPOST_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case BLOGPOST_DETAILS_FAIL:
      return {
        ...state,
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const productReviewsReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case GET_REVIEWS_FAIL:
      return {
        ...state,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
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
