export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";

export function searchProduct(value) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch({ type: SEARCH_REQUEST });
      //api call here
      dispatch({ type: SEARCH_SUCCESS, data: {} });
    } catch (e) {
      dispatch({ type: SEARCH_FAILURE, error: e.message });
    }
  };
}
