import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CartExpiry from "./CartExpiry";
import { showModal } from "../Modals/Actions/ModalAction";
const mapDispatchToProps = dispatch => {
  return {
    showModal: modalType => {
      dispatch(showModal(modalType));
    }
  };
};
const mapStateToProps = state => {
  return {
    cartDetails: state.cartReducer.cartDetails
  };
};
const CartExpiryContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartExpiry)
);
export default CartExpiryContainer;
