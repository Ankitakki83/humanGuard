import { connect } from "react-redux";
import SppButtonWrapper from "../Components/SppButtonWrapper";
import { buyNow, addToBag, notifyMe } from "../Actions/SppButtonWrapperAction";
import { showModal } from "../../Modals/Actions/ModalAction";

import { getCartDetails } from "../../Cart/Actions/CartAction";
import { displayToast } from "../../Toast/Actions/ToastAction";
import { setCurrentUrl } from "../../HeaderFooter/Actions/HeaderAction";
import withRouter from "react-router-dom/withRouter";
import { getProductDetails } from "../../Spp/Actions/SppAction";
const mapDispatchToProps = dispatch => {
  return {
    onClickBuyNow: productId => {
      dispatch(buyNow(productId));
    },
    onClickAddToBag: productCartDetails => {
      return dispatch(addToBag(productCartDetails));
    },
    notifyMe: productId => {
      return dispatch(notifyMe(productId));
    },
    showModal: (modalType, ownProps) => {
      dispatch(showModal(modalType, ownProps));
    },
    displayToast: message => {
      return dispatch(displayToast(message));
    },
    setCurrentUrl: url => {
      dispatch(setCurrentUrl(url));
    },
    getProductDetails: id => {
      dispatch(getProductDetails(id));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    productDetails: state.sppReducer.productDetails,
    productInCart: state.coreReducer.productInCart,
    currenciesList: state.headerReducer.currenciesList,
    history: ownProps.history,
    addToBagLoading: state.coreReducer.addToBagLoading,
    notifyMeLoading: state.coreReducer.notifyMeLoading
  };
};

const SppButtonWrapperContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SppButtonWrapper)
);

export default SppButtonWrapperContainer;
