import React from "react";
import PropTypes from "prop-types";
import styles from "./Carousel.css";
import DesktopOnly from "./DesktopOnly";
import { Swipeable } from "react-swipeable";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import Icon from "./Icon";
import { isArabicLanguageUrl } from "../Utils/UserAgent";

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      juke:
        this.props.children && this.props.children.length
          ? this.props.children.length
          : 0,
      position: 0
    };
  }
  changePosition(i) {
    if (i !== undefined) {
      this.setState({ juke: this.props.children.length }, () => {
        this.setState({ position: i });
      });
    }
  }
  autoRun = () => {
    this.interval = setTimeout(() => {
      this.goForward();
      this.autoRun();
    }, this.props.interval);
  };
  componentDidMount() {
    if (this.props.interval) {
      this.autoRun();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  goForward = () => {
    const childCount = React.Children.count(this.props.children);
    if ((Math.abs(this.state.position) + 1) % childCount === 0) {
      this.setState(
        {
          juke: this.state.juke - this.props.children.length
        },
        () => {
          this.setState({ position: this.state.position + 1 });
        }
      );
    } else {
      this.setState({ position: this.state.position + 1 });
    }
  };
  goBack = () => {
    const childCount = React.Children.count(this.props.children);
    if (Math.abs(this.state.position) === Math.abs(this.state.juke)) {
      this.setState(
        {
          juke: this.state.juke + childCount
        },
        () => {
          this.setState({ position: this.state.position - 1 });
        }
      );
    } else {
      this.setState({ position: this.state.position - 1 });
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
    const jukeTranslationAmount = isArabicLanguageUrl()
      ? 100 * this.state.juke
      : -(100 * this.state.juke);
    const jukeTransform = `translateX(${jukeTranslationAmount}%)`;
    const jukeStyle = {
      transform: jukeTransform
    };
    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div className={styles.rightArrow} onClick={() => this.goForward()}>
            <Icon image={`${PUBLIC_IMAGES_PATH}/down.svg`} size={20} />
          </div>
          <div className={styles.leftArrow} onClick={() => this.goBack()}>
            <Icon image={`${PUBLIC_IMAGES_PATH}/down.svg`} size={20} />
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
        <div className={styles.maxWidth}>
          <div className={styles.nav}>
            {this.props.children.map((val, i) => {
              return (
                <div
                  className={
                    (this.state.position + this.state.juke) %
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
      </div>
    );
  }
}

Carousel.propTypes = {
  interval: PropTypes.number
};
Carousel.defaultProps = {
  interval: 4000
};
