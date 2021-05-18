import { connect } from "react-redux";
import AddToWishlist from "../Components/AddToWishlist";
import { displayToast } from "../../Toast/Actions/ToastAction";
import {
  addToWishlist,
  removeFromWishlist
} from "../Actions/AddToWishlistAction";
import { setCurrentUrl } from "../../HeaderFooter/Actions/HeaderAction";
import { withRouter } from "react-router-dom";
import { showModal } from "../../Modals/Actions/ModalAction";

const mapDispatchToProps = dispatch => {
  return {
    addToWishlist: productId => {
      return dispatch(addToWishlist(productId));
    },
    removeFromWishlist: productId => {
      return dispatch(removeFromWishlist(productId));
    },
    setCurrentUrl: () => {
      dispatch(setCurrentUrl());
    },
    showModal: modalType => {
      dispatch(showModal(modalType));
    },
    displayToast: message => {
      return dispatch(displayToast(message));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    // productId: state.addToWishlistReducer.productId,
    currentUrl: state.headerReducer.currentUrl,
    wishlistItems: state.coreReducer.wishlistItems,
    ...ownProps
  };
};
const AddToWishlistContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddToWishlist)
);
export default AddToWishlistContainer;
