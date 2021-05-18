import React, { Component } from "react";
import CountDown from "./CountDown";
import { CART_EXPIRY_MODAL } from "../Modals/Actions/ModalAction";
import { CART_EXPIRY_MODAL_SHOW_DURATION } from "../Utils/Constants";

class CartExpiry extends Component {
  onComplete = () => {
    this.props.showModal(CART_EXPIRY_MODAL);
  };
  render() {
    const cartDetails = this.props.cartDetails;

    const todayDate = new Date();
    return (
      <div>
        {cartDetails && cartDetails.cartExpiresIn > 0 ? (
          <CountDown
            onComplete={this.onComplete}
            date={todayDate.setSeconds(
              todayDate.getSeconds() +
                (cartDetails.cartExpiresIn - CART_EXPIRY_MODAL_SHOW_DURATION)
            )}
            color=" #eb2026"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default CartExpiry;
