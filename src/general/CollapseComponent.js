import React from "react";
import styles from "./CollapseComponent.css";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import isMobile, { isArabicLanguageUrl } from "../Utils/UserAgent";
export default class CollapseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: props.isOpenByDefault ? props.isOpenByDefault : false
    };
  }

  onClick = () => {
    this.setState({
      expand: !this.state.expand
    });
    if (this.props.onSelect) {
      this.props.onSelect();
    }
  };
  selectTab = pageNumber => {
    if (this.props.selectTab) {
      this.props.selectTab(pageNumber);
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps.isOpenByDefault != this.props.isOpenByDefault) {
      this.setState({ expand: this.props.isOpenByDefault });
    }
  }
  render() {
    return (
      <div className={styles.base}>
        {this.props.isCollapse && (
          <div className={styles.componentTitle} onClick={() => this.onClick()}>
            {this.props.title}
            <span
              className={
                this.state.expand ? styles.iconPosition : styles.svgIconRotate
              }
            >
              {this.state.expand ? (
                <Icon image={`${PUBLIC_IMAGES_PATH}/remove.svg`} size={15} />
              ) : (
                <Icon image={`${PUBLIC_IMAGES_PATH}/close.svg`} size={12} />
              )}
            </span>
          </div>
        )}

        {!this.props.isCollapse && (
          <div
            className={styles.contentWrapper}
            onClick={() =>
              this.props.isArchieved ? this.onClick() : this.props.selectTab()
            }
          >
            <div className={styles.titlesWrapper}>
              {this.props.quantity && (
                <div className={styles.quantity}>{this.props.quantity}</div>
              )}
              <div className={styles.titleSubTitleWrapper}>
                <div className={styles.title1}>{this.props.title}</div>
                {this.props.subTitle && (
                  <div className={styles.title2}>{this.props.subTitle}</div>
                )}
                {this.props.subToSubTitle && (
                  <div className={styles.cashBuyStrip}>
                    {isArabicLanguageUrl()
                      ? "بيع مباشرة إلى الولايات المتحدة وكسب على الفور!"
                      : "SELL DIRECTLY TO US & EARN INSTANTLY!"}
                  </div>
                )}
              </div>
            </div>
            <span>
              {this.state.expand ? (
                <div className={styles.openArrow}>
                  <Icon
                    image={`${PUBLIC_IMAGES_PATH}/right-arrow.svg`}
                    size={10}
                  />
                </div>
              ) : (
                <div className={styles.closeArrow}>
                  <Icon
                    image={`${PUBLIC_IMAGES_PATH}/right-arrow.svg`}
                    size={10}
                  />
                </div>
              )}
            </span>
          </div>
        )}

        {this.state.expand && (
          <div className={styles.panel}>{this.props.childrenComponent}</div>
        )}
      </div>
    );
  }
}

CollapseComponent.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  quantity: PropTypes.number,
  childrenComponent: PropTypes.element,
  isCollapse: PropTypes.bool,
  subToSubTitle: PropTypes.bool
};
CollapseComponent.defaultProps = {
  isCollapse: true,
  subToSubTitle: false
};
