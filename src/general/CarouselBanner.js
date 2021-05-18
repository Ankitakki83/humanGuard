import React from "react";
import PropTypes from "prop-types";
import styles from "./CarouselBanner.css";
import DesktopOnly from "./DesktopOnly";
import { Swipeable } from "react-swipeable";
import Icon from "./Icon";
import { PUBLIC_ASSETS_PATH } from "../Utils/Constants";
export default class CarouselBanner extends React.Component {
  changePosition(i) {
    this.props.changePosition(i);
  }

  goForward = () => {
    this.props.goForward();
  };
  goBack = () => {
    this.props.goBack();
  };
  render() {
    const translationAmount =
      (this.props.isReversSlide ? 1 : -1) * (100 * this.props.position);
    const transform = `translateX(${translationAmount}%)`;
    const style = {
      transform: transform
    };
    const jukeTranslationAmount =
      (this.props.isReversSlide ? 1 : -1) * (100 * this.props.juke);
    const jukeTransform = `translateX(${jukeTranslationAmount}%)`;
    const jukeStyle = {
      transform: jukeTransform
    };
    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div className={styles.rightArrow} onClick={() => this.goForward()}>
            <Icon image={`${PUBLIC_ASSETS_PATH}/downArrowWhite.svg`} />{" "}
          </div>
          <div className={styles.leftArrow} onClick={() => this.goBack()}>
            <Icon image={`${PUBLIC_ASSETS_PATH}/downArrowWhite.svg`} />
          </div>
        </DesktopOnly>
        <Swipeable
          onSwipedLeft={() => this.goForward()}
          onSwipedRight={() => this.goBack()}
        >
          <div className={styles.slider} style={jukeStyle}>
            <div style={style} className={styles.imageHolder}>
              {this.props.children.map((child, i) => {
                return (
                  <div className={styles.item} key={i}>
                    {child}
                  </div>
                );
              })}
              {this.props.children.map((child, i) => {
                return (
                  <div className={styles.item} key={i}>
                    {child}
                  </div>
                );
              })}
            </div>
          </div>
        </Swipeable>
        {this.props.showNav && (
          <div
            className={styles.maxWidth}
            style={{ bottom: this.props.indicatorBottomPosition }}
          >
            <div className={styles.nav}>
              {this.props.children.map((val, i) => {
                return (
                  <div
                    className={
                      (this.props.position + this.props.juke) %
                        this.props.children.length ===
                      i
                        ? styles.active
                        : styles.navButton
                    }
                    key={i}
                    onClick={() => {
                      this.changePosition(i);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CarouselBanner.propTypes = {
  interval: PropTypes.number,
  indicatorBottomPosition: PropTypes.number
};
CarouselBanner.defaultProps = {
  interval: 4000,
  indicatorBottomPosition: 0
};
