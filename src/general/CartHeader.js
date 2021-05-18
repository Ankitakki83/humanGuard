import React from "react";
import styles from "./CartHeader.css";
import DesktopCartSocialComponent from "../Cart/Components/DesktopCartSocialComponent";
import DesktopCartHeader from "./DesktopCartHeader";

import { PUBLIC_IMAGES_PATH, CDN_PATH } from "../Utils/Constants";
import CartExpiryDateStrip from "../Cart/Components/CartExpiryDateStrip";
import { HOME_ROUTE } from "../Utils/RouteUrl";
import { isArabicLanguageUrl } from "../Utils/UserAgent";
const titleArray = [
  isArabicLanguageUrl() ? "كيس" : "Bag",
  isArabicLanguageUrl() ? "عنوان" : "Address",
  isArabicLanguageUrl() ? "دفع" : "Payment"
];
class CartHeader extends React.Component {
  navigateToHomePage = () => {
    if (this.props.history) {
      this.props.history.push(HOME_ROUTE);
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.imageWrapper} onClick={this.navigateToHomePage}>
          <img
            src={`${CDN_PATH}/tlc_logo.png`}
            className={styles.image}
            style={{ height: "auto", maxWidth: "250px" }}
          />
        </div>
        <div className={styles.titleWithSocialHeader}>
          <div className={styles.titlesHolder}>
            <DesktopCartHeader
              titles={titleArray}
              selectedIndex={this.props.selectedIndex}
            />
          </div>
          <div className={styles.socialDataHolder}>
            <DesktopCartSocialComponent />
          </div>
        </div>
        {this.props.expiryDuration && (
          <div className={styles.timerWrapper}>
            <CartExpiryDateStrip
              expiryDuration={this.props.expiryDuration}
              onComplete={this.props.onExpireCart}
              isDesktopCart={this.props.isDesktopCart}
              isBoldLabel={this.props.isBoldLabel}
              showLabels={this.props.showLabels}
              fontFamily={this.props.fontFamily}
            />
          </div>
        )}
      </div>
    );
  }
}
export default CartHeader;
