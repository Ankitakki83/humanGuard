import React from "react";
import styles from "./css/AddToWishlist.css";
import Icon from "../../general/Icon";
import { gtmAddOnWishlist, gtmRemoveFromWishlist } from "../../Utils/Gtm";
import {
  USER_DETAIL_COOKIE,
  ADD_TO_WISHLIST_PRODUCT_DETAIL,
  PUBLIC_IMAGES_PATH,
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
  PREVIOUSPATHNAME
} from "../../Utils/Constants";
import { getCookie } from "../../Utils/Cookies";
import { LOGIN_PATH, MY_ACCOUNT_WISHLIST_PATH } from "../../Utils/RouteUrl";
import {
  ADD_TO_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_SUCCESS
} from "../../CoreComponent/Actions/AddToWishlistAction";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import CoreMessages from "../Messages/CoreMessages";
import { LOGIN_MODAL } from "../../Modals/Actions/ModalAction";
import isMobile from "../../Utils/UserAgent";
import withRouter from "react-router-dom/withRouter";
class AddToWishlist extends React.Component {
  addToWishlist = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (getCookie(USER_DETAIL_COOKIE)) {
      var userDetails = JSON.parse(getCookie(USER_DETAIL_COOKIE));
      if (userDetails && userDetails["access-token"]) {
        gtmAddOnWishlist(this.props.productDetails, this.props.pageName);
        const wishlistResponse = await this.props.addToWishlist(
          this.props.productId
        );
        if (wishlistResponse.type == ADD_TO_WISHLIST_SUCCESS) {
          this.props.displayToast(WISHLIST_ADD_ITEM);
          this.setState({
            itemInWishlist: true
          });
          if (this.props.onAddWishlist) {
            this.props.onAddWishlist();
          }
        }
      }
    } else {
      let productDetails = {
        product_id: this.props.productId
      };
      localStorage.setItem(
        ADD_TO_WISHLIST_PRODUCT_DETAIL,
        JSON.stringify(productDetails)
      );
      if (isMobile()) {
        this.props.setCurrentUrl(
          `${this.props.location.pathname}${this.props.location.search}`
        );

        localStorage.setItem(
          PREVIOUSPATHNAME,
          `${this.props.location.pathname}${this.props.location.search}`
        );
        this.props.history.push(LOGIN_PATH);
      } else {
        this.props.showModal(LOGIN_MODAL);
      }
    }
  };

  removefromWishlist = async e => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (getCookie(USER_DETAIL_COOKIE)) {
        const userDetails = JSON.parse(getCookie(USER_DETAIL_COOKIE));
        if (
          this.props.skipRemoveFromWishlist &&
          this.props.wishlistItems.includes(this.props.productId)
        ) {
          if (this.props.onAddWishlist) {
            this.props.onAddWishlist();
          }
          return true;
        }
        if (userDetails && userDetails["access-token"]) {
          gtmRemoveFromWishlist(this.props.productDetails, this.props.pageName);
          const wishlistResponse = await this.props.removeFromWishlist(
            this.props.productId
          );

          if (wishlistResponse.type == REMOVE_FROM_WISHLIST_SUCCESS) {
            this.props.displayToast(WISHLIST_REMOVE_ITEM);
            this.setState({
              itemInWishlist: false
            });

            if (this.props.onAddWishlist) {
              this.props.onAddWishlist();
            }
          }
        }
      } else {
        if (isMobile()) {
          // this.props.setCurrentUrl(this.props.location.pathname);
          // localStorage.setItem &&
          //   localStorage.setItem(
          //     PREVIOUSPATHNAME,
          //     this.props.location.pathname
          //   );
          this.props.history.push(LOGIN_PATH);
        } else {
          this.props.showModal(LOGIN_MODAL);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  redirectToWishlist = () => {
    this.props.history.push(MY_ACCOUNT_WISHLIST_PATH);
  };
  render() {
    return (
      <div>
        {this.props.isWishlistBox === false && (
          <div>
            {this.props.wishlistItems.includes(this.props.productId) ? (
              <div
                className={styles.addToWishlist}
                onClick={e => this.removefromWishlist(e)}
              >
                <Icon
                  image={`${PUBLIC_IMAGES_PATH}/fillheart.svg`}
                  size={this.props.heartSizeWithoutWishlist}
                />
              </div>
            ) : (
              <div
                className={styles.addToWishlist}
                onClick={event => this.addToWishlist(event)}
              >
                <Icon
                  image={`${PUBLIC_IMAGES_PATH}/heart.svg`}
                  size={this.props.heartSizeWithoutWishlist}
                />
              </div>
            )}
          </div>
        )}

        {this.props.isWishlistBox === true && (
          <div onClick={() => this.redirectToWishlist()}>
            <div
              className={
                this.props.cart
                  ? styles.wishlistButtonWrapperForCart
                  : styles.wishlistButtonWrapper
              }
            >
              <div className={styles.wishlistButtonIcon}>
                <Icon image={`${PUBLIC_IMAGES_PATH}/heart.svg`} size={15} />
              </div>
              {this.props.cart ? (
                <div
                  className={styles.wishlistButtonText}
                  onClick={this.redirectToWishlist}
                >
                  <FormattedMessage
                    {...CoreMessages.addMoreItemFromYporWishlist}
                  />
                </div>
              ) : (
                <div className={styles.wishlistButtonText}>
                  <FormattedMessage {...CoreMessages.moveToWishlist} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AddToWishlist);
AddToWishlist.propTypes = {
  isWishlistBox: PropTypes.bool
};

AddToWishlist.defaultProps = {
  isWishlistBox: false,
  heartSizeWithoutWishlist: 20
};
