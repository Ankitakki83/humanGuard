export const ADD_TO_WISHLIST_REQUEST = "ADD_TO_WISHLIST_REQUEST";
export const ADD_TO_WISHLIST_SUCCESS = "ADD_TO_WISHLIST_SUCCESS";
export const ADD_TO_WISHLIST_FAILURE = "ADD_TO_WISHLIST_FAILURE";

export const REMOVE_FROM_WISHLIST_REQUEST = "REMOVE_FROM_WISHLIST_REQUEST";
export const REMOVE_FROM_WISHLIST_SUCCESS = "REMOVE_FROM_WISHLIST_SUCCESS";
export const REMOVE_FROM_WISHLIST_FAILURE = "REMOVE_FROM_WISHLIST_FAILURE";

export const GET_WISHLIST_REQUEST = "GET_WISHLIST_REQUEST";
export const GET_WISHLIST_SUCCESS = "GET_WISHLIST_SUCCESS";
export const GET_WISHLIST_FAILURE = "GET_WISHLIST_FAILURE";

import getFailureResponse from "../../Utils/ErrorHandeling";
import { getCookie } from "../../Utils/Cookies";
import { USER_DETAIL_COOKIE } from "../../Utils/Constants";

export function addToWishlist(productId) {
  return async (dispatch, getState, { api }) => {
    try {
      if (!getCookie(USER_DETAIL_COOKIE)) {
        throw Error("User Not logged in");
      }
      const userDetails = JSON.parse(getCookie(USER_DETAIL_COOKIE));
      dispatch({ type: ADD_TO_WISHLIST_REQUEST });
      const result = await api.post(
        `v3/users/${userDetails.information.user_id}/wish-list?access-token=${
          userDetails["access-token"]
        }`,
        {
          product_id: productId
        }
      );

      const resultJson = await getFailureResponse(result);

      if (resultJson.status) {
        throw Error(resultJson.error);
      }
      // no need to import  EMPTY_WISHLIST constant here from myAccountAction
      // it increasing main bundle size . so jsut uses same value hard code
      dispatch({ type: "EMPTY_WISHLIST" });
      return dispatch({
        type: ADD_TO_WISHLIST_SUCCESS,
        productId
      });
    } catch (e) {
      return dispatch({ type: ADD_TO_WISHLIST_FAILURE, error: e.message });
    }
  };
}

export function removeFromWishlist(productId) {
  return async (dispatch, getState, { api }) => {
    try {
      if (!getCookie(USER_DETAIL_COOKIE)) {
        throw Error("User Not logged in");
      }
      const userDetails = JSON.parse(getCookie(USER_DETAIL_COOKIE));
      dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });
      const result = await api.deleteRequest(
        `v3/users/${
          userDetails.information.user_id
        }/wish-list/${productId}?access-token=${userDetails["access-token"]}`
      );

      const resultJson = await getFailureResponse(result);

      if (resultJson.status) {
        throw Error(resultJson.error);
      }
      dispatch({ type: "EMPTY_WISHLIST" });
      return dispatch({
        type: REMOVE_FROM_WISHLIST_SUCCESS,

        productId: productId
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_FROM_WISHLIST_FAILURE,
        error: e.message
      });
    }
  };
}
export function getWishlistItems() {
  return async (dispatch, getState, { api }) => {
    dispatch({ type: GET_WISHLIST_REQUEST });
    try {
      const userDetailsCookie = getCookie(USER_DETAIL_COOKIE);
      const result = await api.get(
        `v3/my-accounts/${
          JSON.parse(userDetailsCookie).information.user_id
        }/my-wishlist?access-token=${
          JSON.parse(userDetailsCookie)["access-token"]
        }`
      );
      const resultJson = await getFailureResponse(result);
      if (resultJson.status) {
        throw Error(resultJson.error);
      }
      return dispatch({
        type: GET_WISHLIST_SUCCESS,
        wishlist: resultJson.data
      });
    } catch (e) {
      return dispatch({
        type: GET_WISHLIST_FAILURE,
        error: e.message
      });
    }
  };
}
