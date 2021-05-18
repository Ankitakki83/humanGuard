import getFailureResponse from "../../Utils/ErrorHandeling";
import { getCookie } from "../../Utils/Cookies";
import { getCartDetails } from "../../Cart/Actions/CartAction";
import { displayToast } from "../../Toast/Actions/ToastAction";
export const BUY_NOW_REQUEST = "BUY_NOW_REQUEST";
export const BUY_NOW_SUCCESS = "BUY_NOW_SUCCESS";
export const BUY_NOW_FAILURE = "BUY_NOW_FAILURE";

export const ADD_TO_BAG_REQUEST = "ADD_TO_BAG_REQUEST";
export const ADD_TO_BAG_SUCCESS = "ADD_TO_BAG_SUCCESS";
export const ADD_TO_BAG_FAILURE = "ADD_TO_BAG_FAILURE";

export const NOTIFY_ME_REQUEST = "NOTIFY_ME_REQUEST";
export const NOTIFY_ME_SUCCESS = "NOTIFY_ME_SUCCESS";
export const NOTIFY_ME_FAILURE = "NOTIFY_ME_FAILURE";

export const CLEAR_CART_PRODUCT_DETAILS = "CLEAR_CART_PRODUCT_DETAILS";
export function buyNow(productId) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch({ type: BUY_NOW_REQUEST });

      dispatch({ type: BUY_NOW_SUCCESS, data: {} });
    } catch (e) {
      dispatch({ type: BUY_NOW_FAILURE, error: e.message });
    }
  };
}

export function addToBag(productCartDetails) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch({
        type: ADD_TO_BAG_REQUEST,
        productDetails: productCartDetails
      });
      const accessToken = JSON.parse(getCookie("userDetails"))["access-token"];
      const result = await api.post(
        `v3/carts?access-token=${accessToken}`,
        productCartDetails
      );
      const resultJson = await getFailureResponse(result);
      if (resultJson.status) {
        throw Error(resultJson.error);
      }
      dispatch(getCartDetails());
      return dispatch({ type: ADD_TO_BAG_SUCCESS, data: resultJson.data });
    } catch (e) {
      dispatch(displayToast(e.message));
      return dispatch({
        type: ADD_TO_BAG_FAILURE,
        error: e.message,
        productDetails: productCartDetails
      });
    }
  };
}

export function notifyMe(payload) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch({ type: NOTIFY_ME_REQUEST });
      const accessToken = JSON.parse(getCookie("userDetails"))["access-token"];

      const result = await api.post(
        `v3/my-accounts/${
          JSON.parse(getCookie("userDetails")).information.user_id
        }/saved-searches?access-token=${accessToken}`,
        payload
      );
      const resultJson = await getFailureResponse(result);
      if (resultJson.status) {
        throw Error(resultJson.error);
      }
      dispatch(
        displayToast(resultJson && resultJson.data && resultJson.data.message)
      );
      dispatch({ type: NOTIFY_ME_SUCCESS, data: {} });
    } catch (e) {
      if (e.message == "Saved search has been duplicated.") {
        dispatch(displayToast(e.message));
      }
      dispatch({ type: NOTIFY_ME_FAILURE, error: e.message });
    }
  };
}
export function clearCartProductDetails(productDetailsId) {
  return {
    type: CLEAR_CART_PRODUCT_DETAILS,
    productDetailsId
  };
}
