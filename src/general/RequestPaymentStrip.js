import React from "react";
import styles from "./RequestPaymentStrip.css";
import Icon from "./Icon";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import isMobile, { isArabicLanguageUrl } from "../Utils/UserAgent";
import MobileOnly from "./MobileOnly";
import DesktopOnly from "./DesktopOnly";
import { withRouter } from "react-router-dom";
import { MY_ITEMS, ITEM_ON_SOLD_TEXT } from "../MyItems/MyItemConstant";
class RequestPaymentStrip extends React.Component {
  onExpand = () => {
    this.props.onSelect();
  };
  render() {
    return (
      <React.Fragment>
        <div>
          {!this.props.isMyAccountPaymentDetail || isMobile() ? (
            <div
              className={
                this.props.isSelected && this.props.verified
                  ? this.props.showWhite
                    ? styles.showWhiteBase
                    : styles.baseSelected
                  : styles.base
              }
            >
              <div className={styles.test} onClick={() => this.onExpand()}>
                <div className={styles.checkboxHeader}>
                  {this.props.isSelected ? (
                    <div className={styles.checkbox}>
                      <div className={styles.blackTick} />
                    </div>
                  ) : (
                    <div className={styles.unsetCheckbox} />
                  )}
                </div>
                <MobileOnly>
                  <div
                    className={
                      this.props.verified ? styles.titles : styles.unTitles
                    }
                  >
                    <div
                      className={
                        this.props.isSelected
                          ? styles.selectedLabelTitle
                          : styles.labelTitle
                      }
                    >
                      {this.props.labelTitle}
                    </div>
                    <div className={styles.subLabelTitle}>
                      {this.props.subTitle}
                    </div>
                  </div>
                  {this.props.verified && (
                    <div className={styles.verified}>
                      <div className={styles.icon}>
                        <Icon
                          image={`${PUBLIC_IMAGES_PATH}/verifiedGreen.svg`}
                          size={12}
                        />
                      </div>
                      <div className={styles.verifiedLabel}>
                        {isArabicLanguageUrl() ? "التحقق" : "VERIFIED"}
                      </div>
                    </div>
                  )}
                </MobileOnly>
                <DesktopOnly>
                  <div
                    className={
                      this.props.verified ? styles.titles : styles.unTitles
                    }
                  >
                    <div
                      className={
                        this.props.isSelected
                          ? styles.selectedLabelTitle
                          : styles.labelTitle
                      }
                    >
                      {this.props.labelTitle}
                    </div>
                    <div className={styles.subLabelTitle}>
                      {this.props.subTitle}
                    </div>
                    {this.props.verified && (
                      <div className={styles.verified}>
                        <div className={styles.icon}>
                          <Icon
                            image={`${PUBLIC_IMAGES_PATH}/verifiedGreen.svg`}
                            size={12}
                          />
                        </div>
                        <div className={styles.verifiedLabel}>
                          {isArabicLanguageUrl() ? "التحقق" : "VERIFIED"}
                        </div>
                      </div>
                    )}
                  </div>
                </DesktopOnly>
                {!this.props.verified && (
                  <div
                    className={styles.verified}
                    onClick={() => this.props.sendVerificationCode()}
                  >
                    <div className={styles.verifyLabel}>
                      {isArabicLanguageUrl() ? "التحقق" : "VERIFY"}
                    </div>
                  </div>
                )}
              </div>

              {this.props.isSelected && (
                <div
                  className={
                    this.props.location.pathname ===
                    `${MY_ITEMS}${ITEM_ON_SOLD_TEXT}`
                      ? styles.modalComponent
                      : styles.component
                  }
                >
                  {this.props.component}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                className={styles.paymentStripDropdownWrapper}
                onClick={() => this.onExpand()}
              >
                <div className={styles.title}>{this.props.labelTitle}-</div>
                <div classNam={styles.subTitlelabel}>
                  {this.props.subTitle}
                  {"  "}
                </div>
                {"  "}
                {this.props.verified && (
                  <div className={styles.verifyMyAccountPayment}>
                    <div className={styles.verifiedLabelmyAccountPyament}>
                      ( {isArabicLanguageUrl() ? "التحقق" : "VERIFIED"} )
                    </div>
                  </div>
                )}
                {"  "}
                {!this.props.verified && (
                  <div
                    className={styles.verifyMyAccountPayment}
                    onClick={() => this.props.sendVerificationCode()}
                  >
                    <div className={styles.verifyLabelmyAccountPyament}>
                      ( {isArabicLanguageUrl() ? "التحقق" : "VERIFY"} )
                    </div>
                  </div>
                )}
                <div
                  className={
                    this.props.isSelected
                      ? styles.iconMyAccountPaymentDetailsSelected
                      : styles.iconMyAccountPaymentDetails
                  }
                >
                  <Icon image={`${PUBLIC_IMAGES_PATH}/down.svg`} size={12} />
                </div>
              </div>
              {this.props.isSelected && (
                <div className={styles.component}>{this.props.component}</div>
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(RequestPaymentStrip);
