import React from "react";
import styles from "./css/SppButtonWrapper.css";
import Button from "../../general/Button";
import WhiteButton from "../../general/WhiteButton";
import { FormattedMessage } from "react-intl";
import { LOGIN_PATH, CART_PATH, CHECKOUT_PATH } from "../../Utils/RouteUrl";
import {
  SOLD,
  RESERVED,
  ADD_TO_BAG_PRODUCT_DETAIL,
  BUY_NOW_PRODUCT_DETAIL,
  CART_PRODUCT_DETAILS,
  ADD_TO_BAG_FAILURE_Error,
  ADD_TO_BAG,
  UNAVAILABLE,
  SOLD_OUT,
  NOTIFY_ME_LOCAL_STORAGE,
  PREVIOUSPATHNAME
} from "../../Utils/Constants";
import { getCookie } from "../../Utils/Cookies";
import {
  ADD_TO_BAG_SUCCESS,
  ADD_TO_BAG_FAILURE
} from "../Actions/SppButtonWrapperAction";
import isMobile from "../../Utils/UserAgent";
import { LOGIN_MODAL } from "../../Modals/Actions/ModalAction";
import { gtmClickOnAddToCart } from "../../Utils/Gtm";
import { fbClickOnAddToCart } from "../../Utils/fbTracking";
import SppMessages from "../../Spp/Messages/SppMessages";
export default class SppButtonWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyNowLoading: false
    };
  }
  resetState = () => {
    this.setState({
      buyNowLoading: false
    });
  };
  onClickBuyNow = async (productID, isAlreadyAddToBag) => {
    this.setState({
      buyNowLoading: true
    });
    gtmClickOnAddToCart(this.props.productDetails);
    fbClickOnAddToCart(this.props.productDetails, this.props.currenciesList);
    let productCartDetails = {
      product_id: productID,
      installments: 0,
      quantity: 1
    };
    if (isAlreadyAddToBag) {
      let productObj = {
        productIds: [this.props.productDetails.id]
      };

      localStorage.setItem(CART_PRODUCT_DETAILS, JSON.stringify(productObj));
      this.props.history.push(CHECKOUT_PATH);
      return false;
    }
    if (!getCookie("userDetails")) {
      let productObj = {
        productIds: this.props.productDetails.id
      };
      localStorage.setItem(
        BUY_NOW_PRODUCT_DETAIL,
        JSON.stringify(productCartDetails)
      );
      localStorage.setItem(CART_PRODUCT_DETAILS, JSON.stringify(productObj));
      if (isMobile()) {
        this.props.history.push(LOGIN_PATH);
      } else {
        let behaviourOfCancel = {};
        behaviourOfCancel.cancelButtonOfBuyNow = this.resetState;
        this.props.showModal(LOGIN_MODAL, behaviourOfCancel);
        return true;
      }
    } else {
      const addToBagResponse = await this.props.onClickAddToBag(
        productCartDetails
      );
      this.setState({ buyNowLoading: false });
      if (addToBagResponse && addToBagResponse.type === ADD_TO_BAG_SUCCESS) {
        let productObj = {
          productIds: [this.props.productDetails.id]
        };

        localStorage.setItem(CART_PRODUCT_DETAILS, JSON.stringify(productObj));
        this.props.history.push(CHECKOUT_PATH);
      }
    }
    this.props.onClickBuyNow(this.props.productId);
  };
  onClickAddToBag = async productID => {
    gtmClickOnAddToCart(this.props.productDetails);
    fbClickOnAddToCart(this.props.productDetails, this.props.currenciesList);
    let productCartDetails = {
      product_id: productID,
      installments: 0,
      quantity: 1
    };
    if (!getCookie("userDetails")) {
      localStorage.setItem(
        ADD_TO_BAG_PRODUCT_DETAIL,
        JSON.stringify(productCartDetails)
      );
      if (isMobile()) {
        this.props.setCurrentUrl(this.props.location.pathname);
        localStorage.setItem &&
          localStorage.setItem(PREVIOUSPATHNAME, this.props.location.pathname);
        this.props.history.push(LOGIN_PATH);
      } else {
        this.props.showModal(LOGIN_MODAL);
      }
    } else {
      const addToBagResponse = await this.props.onClickAddToBag(
        productCartDetails
      );

      if (addToBagResponse && addToBagResponse.type === ADD_TO_BAG_SUCCESS) {
        this.props.displayToast(ADD_TO_BAG);
        // this.props.getProductDetails(this.props.productDetails.id);
      }
      if (
        addToBagResponse &&
        addToBagResponse.type === ADD_TO_BAG_FAILURE &&
        addToBagResponse.error === ADD_TO_BAG_FAILURE_Error
      ) {
        this.props.displayToast(ADD_TO_BAG_FAILURE_Error);
      }
    }
  };
  notifyMe = (name, id) => {
    const payload = {
      search: name,
      product_id: id
    };
    if (!getCookie("userDetails")) {
      localStorage.setItem &&
        localStorage.setItem(NOTIFY_ME_LOCAL_STORAGE, JSON.stringify(payload));
      this.props.setCurrentUrl(this.props.location.pathname);
      localStorage.setItem &&
        localStorage.setItem(PREVIOUSPATHNAME, this.props.location.pathname);
      this.props.history.push(LOGIN_PATH);
    } else {
      this.props.notifyMe(payload);
    }
  };
  goToCart = () => {
    this.props.history.push(CART_PATH);
  };

  render() {
    const productStatus =
      this.props.productDetails &&
      this.props.productDetails.current_status &&
      this.props.productDetails.current_status.toLowerCase();
    const productID = this.props.productDetails.id;
    let message;
    let showAddToBagAndBuyNowButton = true;
    if (productStatus === SOLD || productStatus === SOLD_OUT) {
      showAddToBagAndBuyNowButton = false;
      message = SppMessages.soldOutTitle;
    } else if (productStatus === RESERVED) {
      showAddToBagAndBuyNowButton = false;
      message = SppMessages.reservedTitle;
    } else if (productStatus === UNAVAILABLE) {
      showAddToBagAndBuyNowButton = false;
      message = SppMessages.unavailable;
    }

    return (
      <div className={styles.base}>
        <div className={styles.buttonWrapper}>
          <div className={styles.paddingWrapper}>
            {!showAddToBagAndBuyNowButton ? (
              <div className={styles.soldOutWrapper}>
                <div className={styles.soldOuttitle}>
                  <FormattedMessage {...message} />
                </div>
                <div className={styles.notifyMe}>
                  <Button
                    label={<FormattedMessage {...SppMessages.notifyMe} />}
                    onClick={() =>
                      this.notifyMe(
                        this.props.productDetails.name,
                        this.props.productDetails.id
                      )
                    }
                    height={isMobile() ? 50 : 42}
                    loading={this.props.notifyMeLoading}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.addToBagButtonWrapper}>
                <div className={styles.buyNowButton}>
                  <WhiteButton
                    label={<FormattedMessage {...SppMessages.buyNowTitle} />}
                    onClick={() =>
                      this.onClickBuyNow(
                        productID,
                        this.props.productInCart &&
                          this.props.productInCart.items &&
                          this.props.productInCart.items.find(
                            item => item.id == productID
                          )
                      )
                    }
                    height={isMobile() ? 50 : 42}
                    backgroundColor={"#fff"}
                    loading={this.state.buyNowLoading}
                    textStyle={{ color: "#000", fontFamily: "Proxima Nova" }}
                  />
                </div>
                {this.props.productInCart &&
                this.props.productInCart.items &&
                this.props.productInCart.items.find(
                  item => item.id == productID
                ) ? (
                  <div className={styles.goToCart}>
                    <Button
                      label={<FormattedMessage {...SppMessages.goToCart} />}
                      onClick={() => this.goToCart()}
                      height={isMobile() ? 50 : 42}
                    />
                  </div>
                ) : (
                  <div className={styles.addToBagButton}>
                    <Button
                      label={
                        <FormattedMessage {...SppMessages.addToBagTitle} />
                      }
                      onClick={() => this.onClickAddToBag(productID)}
                      height={isMobile() ? 50 : 42}
                      loading={
                        !this.state.buyNowLoading && this.props.addToBagLoading
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
