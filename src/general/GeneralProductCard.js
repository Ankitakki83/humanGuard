import React, { Component } from "react";
import styles from "./GeneralProductCard.css";
import Icon from "./Icon";
import Image from "./Image";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import PropTypes from "prop-types";
import ShowPriceContainer from "./ShowPriceContainer";
import { renderDateFormat } from "../Utils/DateUtils";
import AllInclusiveTooltip from "./AllInclusiveTooltip";
import { FormattedMessage } from "react-intl";
import CoreMessages from "../CoreComponent/Messages/CoreMessages";
import FilterMessage from "../FilterComponent/Messages/FilterMessage";
import { isArabicLanguageUrl } from "../Utils/UserAgent";
import withRouter from "react-router-dom/withRouter";
import { SPP_PRODUCT_ID_ROUTE } from "../Utils/RouteUrl";
import HomeMessage from "../Home/Messages/HomeMessage";
class GeneralProductCard extends Component {
  goToProductDescription = productId => {
    if (productId) {
      if (this.props.wantClearSppDetails) {
        this.props.clearSppProductDetails(productId);
      }
      let redirectUrl = `${SPP_PRODUCT_ID_ROUTE}?id=${productId}`;
      this.props.history.push(redirectUrl);
    }
  };
  removeItemFromWishlist = e => {
    e.stopPropagation();
    this.props.removeFromWishlist();
  };
  render() {
    return (
      <div
        className={styles.base}
        onClick={() => {
          this.goToProductDescription(this.props.productId);
        }}
      >
        {this.props.shipmentDetails ? (
          <div className={styles.cartHeader}>
            <div className={styles.shipment}>
              {<FormattedMessage {...HomeMessage.shippingContent} />}{" "}
              {this.props.id}
            </div>
            {this.props.expectedTimeRange && (
              <div className={styles.deliveryDate}>
                {<FormattedMessage {...CoreMessages.EstimatedDelivery} />}:{" "}
                {renderDateFormat(
                  this.props.expectedTimeRange.expected_time_range
                    .expected_delivery_from
                )}{" "}
                -{" "}
                {renderDateFormat(
                  this.props.expectedTimeRange.expected_time_range
                    .expected_delivery_to
                )}
              </div>
            )}
          </div>
        ) : null}

        <div
          className={
            this.props.isAccountOrderDetails
              ? styles.accountOrderDetails
              : styles.imageContentWrapper
          }
        >
          <div className={styles.cardImage}>
            <Image src={this.props.image} />
          </div>

          <div className={styles.cardDetails}>
            <div className={styles.brandName}>{this.props.brandName}</div>
            <div
              className={
                this.props.myPurchasePage
                  ? styles.itemDescriptionMyPurchase
                  : styles.itemDescription
              }
            >
              {this.props.description}
            </div>
            {!this.props.isComingFromMyAccountWishlist &&
              this.props.conditions && (
                <div
                  className={
                    this.props.myPurchasePage
                      ? styles.conditionsWrapperMyPurchase
                      : styles.conditionsWrapper
                  }
                >
                  {
                    <FormattedMessage
                      {...FilterMessage.mobileFilterConditionsTitle}
                    />
                  }{" "}
                  :{" "}
                  <span className={styles.conditions}>
                    {this.props.conditions}
                  </span>
                </div>
              )}
            {!this.props.isComingFromMyAccountWishlist && this.props.size && (
              <div className={styles.conditionsWrapper}>
                {<FormattedMessage {...HomeMessage.sizeContent} />} :{" "}
                <span className={styles.conditions}>{this.props.size}</span>
              </div>
            )}
            {this.props.returnableItem && (
              <div className={styles.returnableItem}>
                {<FormattedMessage {...CoreMessages.RETURNABLEITEM} />}
              </div>
            )}
            {!this.props.isComingFromOrderDetails && this.props.price && (
              <div className={styles.priceAllInclusiveWrapper}>
                <div className={styles.price}>
                  {this.props.exchangeRates && (
                    <ShowPriceContainer
                      price={this.props.price}
                      currenciesList={{
                        currencies: this.props.exchangeRates
                      }}
                    />
                  )}
                  {!this.props.exchangeRates && (
                    <ShowPriceContainer price={this.props.price} />
                  )}
                </div>
                <div className={styles.allInclusive}>
                  <div>
                    {<FormattedMessage {...HomeMessage.AllInclusive} />}
                  </div>
                  <div className={styles.infoIcon}>
                    <AllInclusiveTooltip
                      price={this.props.price}
                      right={isArabicLanguageUrl() ? false : true}
                      left={isArabicLanguageUrl() ? true : false}
                    />
                  </div>
                </div>
              </div>
            )}
            {this.props.isComingFromOrderDetails && this.props.price && (
              <div className={styles.priceAllInclusiveWrapper}>
                <div className={styles.price}>
                  {this.props.exchangeRates && (
                    <ShowPriceContainer
                      price={this.props.price}
                      currenciesList={{
                        currencies: this.props.exchangeRates
                      }}
                    />
                  )}
                  {!this.props.exchangeRates && (
                    <ShowPriceContainer price={this.props.price} />
                  )}
                </div>
              </div>
            )}
            {this.props.isComingFromMyAccountWishlist && this.props.size && (
              <div className={styles.conditionsWrapperOfWishlist}>
                {<FormattedMessage {...HomeMessage.sizeContent} />} :{" "}
                <span className={styles.conditions}>{this.props.size}</span>
              </div>
            )}
            {this.props.isComingFromMyAccountWishlist && this.props.conditions && (
              <div className={styles.conditionsWrapperOfWishlist}>
                {
                  <FormattedMessage
                    {...FilterMessage.mobileFilterConditionsTitle}
                  />
                }{" "}
                :{" "}
                <span className={styles.conditions}>
                  {this.props.conditions}
                </span>
              </div>
            )}

            {this.props.refundableAmoutDetails && (
              <div>
                <div className={styles.refundableAmountAndFees}>
                  <div className={styles.refundAmountTitle}>
                    {<FormattedMessage {...CoreMessages.RefundableAmount} />}
                  </div>
                  <div>
                    <div className={styles.price}>
                      {this.props.exchangeRates && (
                        <ShowPriceContainer
                          price={this.props.price}
                          currenciesList={{
                            currencies: this.props.exchangeRates
                          }}
                        />
                      )}
                      {!this.props.exchangeRates && (
                        <ShowPriceContainer price={this.props.price} />
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.refundableAmountAndFees}>
                  <div>{<FormattedMessage {...CoreMessages.amount} />}</div>
                  <div>
                    {this.props.exchangeRates && (
                      <ShowPriceContainer
                        price={this.props.price}
                        currenciesList={{
                          currencies: this.props.exchangeRates
                        }}
                      />
                    )}
                    {!this.props.exchangeRates && (
                      <ShowPriceContainer price={this.props.price} />
                    )}
                  </div>
                </div>
                <div className={styles.refundableAmountAndFees}>
                  <div>
                    {<FormattedMessage {...CoreMessages.RestockingFees} />}
                  </div>
                  <div>
                    {this.props.exchangeRates && (
                      <ShowPriceContainer
                        price={this.props.price}
                        currenciesList={{
                          currencies: this.props.exchangeRates
                        }}
                      />
                    )}
                    {!this.props.exchangeRates && (
                      <ShowPriceContainer price={this.props.price} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {this.props.isComingFromMyAccountWishlist && (
            <div
              className={styles.crossIcon}
              onClick={e => this.removeItemFromWishlist(e)}
            >
              <Icon image={`${PUBLIC_IMAGES_PATH}/close.svg`} size={12} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
GeneralProductCard.propTypes = {
  conditions: PropTypes.string,
  size: PropTypes.string,
  returnableItem: PropTypes.string,
  price: PropTypes.number,

  brandName: PropTypes.string,
  description: PropTypes.string,

  image: PropTypes.string
};
GeneralProductCard.defaultProps = {
  isComingFromOrderDetails: false,
  isAccountOrderDetails: false,
  isComingFromMyAccountWishlist: false
};

export default withRouter(GeneralProductCard);
