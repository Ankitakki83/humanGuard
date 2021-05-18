import React from "react";
import styles from "./DesktopGeneralCarousal.css";
import Icon from "./Icon";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import { isArabicLanguageUrl } from "../Utils/UserAgent";

export default class DesktopGeneralCarousal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      itemShown: 5
    };
  }
  backward = () => {
    if (this.state.position != 0) {
      this.setState({ position: this.state.position - 1 });
    }
  };
  forward = () => {
    const childCount = React.Children.count(this.props.children);
    if (
      (this.state.position + 1) * this.state.itemShown < childCount &&
      childCount > this.state.itemShown
    ) {
      this.setState({ position: this.state.position + 1 });
    }
  };
  render() {
    const translationAmount = isArabicLanguageUrl()
      ? 100 * this.state.position
      : -(100 * this.state.position);
    const transform = `translateX(${translationAmount}%)`;
    const style = {
      transform: transform
    };
    const divStyle = {
      width: `${100 / this.state.itemShown}%`
    };
    const childCount = React.Children.count(this.props.children);
    return (
      <div className={styles.base}>
        <div className={styles.carousalTitleArrowWrapper}>
          {this.state.position != 0 && (
            <div
              className={styles.backwardArrow}
              onClick={() => this.backward()}
            >
              <Icon image={`${PUBLIC_IMAGES_PATH}/down.svg`} size={10} />
            </div>
          )}
          <div className={styles.title}>{this.props.title}</div>
          {(this.state.position + 1) * this.state.itemShown < childCount &&
            childCount > this.state.itemShown && (
              <div
                className={styles.forwardArrow}
                onClick={() => this.forward()}
              >
                <Icon image={`${PUBLIC_IMAGES_PATH}/down.svg`} size={10} />
              </div>
            )}
        </div>
        <div className={styles.slider}>
          <div style={style} className={styles.imageHolder}>
            {this.props.children &&
              this.props.children.map((child, i) => {
                return (
                  <div className={styles.item} key={i} style={divStyle}>
                    {child}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
