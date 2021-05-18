import * as addToWishlistAction from "../Actions/AddToWishlistAction";
import * as searchList from "../Actions/SearchAction";
import * as SppButtonWrapAction from "../Actions/SppButtonWrapperAction";
import { REMOVE_ITEMS_FROM_CART_SUCCESS } from "../../Cart/Actions/CartAction";
import { EMPTY_CORE_REDUCER_DETAILS } from "../../Auth/Actions/AuthActions";
import cloneDeep from "lodash.clonedeep";
const coreReducer = (
  state = {
    productId: "",
    productInCart: "",
    addToWhishListLoading: false,
    addToWishlistError: "",
    value: "",
    searchProductLoading: false,
    searchProductError: "",
    buyNowLoading: false,
    buyNowError: "",
    addToBagLoading: false,
    addToBagError: "",
    notifyMeLoading: false,
    notifyMeError: "",
    removeFromWhishListLoading: false,
    removeFromWishlistError: "",
    wishlistItems: [],
    productDetails: ""
  },
  action
) => {
  let currentWishlist = [];
  switch (action.type) {
    case addToWishlistAction.ADD_TO_WISHLIST_REQUEST:
      return Object.assign({}, state, {
        addToWhishListLoading: true
      });
    case addToWishlistAction.ADD_TO_WISHLIST_SUCCESS:
      currentWishlist = cloneDeep(state.wishlistItems);
      if (!currentWishlist.includes(action.productId)) {
        currentWishlist.push(action.productId);
      }

      return Object.assign({}, state, {
        addToWhishListLoading: false,
        wishlistItems: currentWishlist
      });
    case addToWishlistAction.ADD_TO_WISHLIST_FAILURE:
      return Object.assign({}, state, {
        addToWishlistError: action.error,
        addToWhishListLoading: false
      });
    case SppButtonWrapAction.BUY_NOW_REQUEST:
      return Object.assign({}, state, {
        buyNowLoading: true
      });
    case SppButtonWrapAction.BUY_NOW_SUCCESS:
      return Object.assign({}, state, {
        productId: action.data,
        buyNowLoading: false
      });
    case SppButtonWrapAction.BUY_NOW_FAILURE:
      return Object.assign({}, state, {
        buyNowError: action.error,
        buyNowLoading: false
      });
    case SppButtonWrapAction.ADD_TO_BAG_REQUEST:
      return Object.assign({}, state, {
        addToBagLoading: true,
        productDetails: action.productDetails
      });
    case SppButtonWrapAction.ADD_TO_BAG_SUCCESS:
      return Object.assign({}, state, {
        productInCart: action.data,
        addToBagLoading: false
      });
    case SppButtonWrapAction.ADD_TO_BAG_FAILURE:
      return Object.assign({}, state, {
        addToBagError: action.error,
        addToBagLoading: false,
        productDetails: action.productDetails
      });
    case SppButtonWrapAction.NOTIFY_ME_REQUEST:
      return Object.assign({}, state, {
        notifyMeLoading: true
      });
    case SppButtonWrapAction.NOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        productId: action.data,
        notifyMeLoading: false
      });
    case SppButtonWrapAction.NOTIFY_ME_FAILURE:
      return Object.assign({}, state, {
        notifyMeError: action.error,
        notifyMeLoading: false
      });
    case searchList.SEARCH_REQUEST:
      return Object.assign({}, state, {
        searchProductLoading: true
      });
    case searchList.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        value: action.data,
        searchProductLoading: false
      });
    case searchList.SEARCH_FAILURE:
      return Object.assign({}, state, {
        searchProductError: action.error,
        searchProductLoading: false
      });
    case addToWishlistAction.REMOVE_FROM_WISHLIST_REQUEST:
      return Object.assign({}, state, {
        removeFromWhishListLoading: true
      });
    case addToWishlistAction.REMOVE_FROM_WISHLIST_SUCCESS:
      currentWishlist = state.wishlistItems;
      if (currentWishlist.includes(action.productId)) {
        const index = currentWishlist.indexOf(action.productId);
        currentWishlist.splice(index, 1);
      }
      return Object.assign({}, state, {
        removeFromWhishListLoading: false,
        wishlistItems: currentWishlist
      });
    case addToWishlistAction.REMOVE_FROM_WISHLIST_FAILURE:
      return Object.assign({}, state, {
        removeFromWishlistError: action.error,
        removeFromWhishListLoading: false
      });
    case SppButtonWrapAction.CLEAR_CART_PRODUCT_DETAILS:
      return Object.assign({}, state, {
        productInCart: ""
      });
    case addToWishlistAction.GET_WISHLIST_SUCCESS:
      currentWishlist = state.wishlistItems;
      if (action.wishlist.wishlist && action.wishlist.wishlist.length > 0) {
        currentWishlist = action.wishlist.wishlist.map(item => item.id);
      }
      return Object.assign({}, state, {
        wishlistItems: currentWishlist
      });

    case REMOVE_ITEMS_FROM_CART_SUCCESS:
      return Object.assign({}, state, {
        productInCart: action.data,
        addToBagLoading: false
      });

    case EMPTY_CORE_REDUCER_DETAILS:
      return Object.assign({}, state, {
        productId: "",
        productInCart: "",
        addToWhishListLoading: false,
        addToWishlistError: "",
        value: "",
        searchProductLoading: false,
        searchProductError: "",
        buyNowLoading: false,
        buyNowError: "",
        addToBagLoading: false,
        addToBagError: "",
        notifyMeLoading: false,
        notifyMeError: "",
        removeFromWhishListLoading: false,
        removeFromWishlistError: "",
        wishlistItems: [],
        productDetails: ""
      });
    default:
      return state;
  }
};

export default coreReducer;
