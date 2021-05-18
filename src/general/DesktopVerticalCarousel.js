import React from "react";
import styles from "./DesktopVerticalCarousel.css";
import { Swipeable } from "react-swipeable";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import Icon from "./Icon";

export default class DesktopVerticalCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
  }

  goDown = () => {
    const childCount = React.Children.count(this.props.children);
    if ((this.state.position + 1) * 4 < childCount && childCount > 4) {
      this.setState({ position: this.state.position + 1 });
    }
  };
  goUp = () => {
    if (this.state.position != 0) {
      this.setState({ position: this.state.position - 1 });
    }
  };
  render() {
    const translationAmount = -(100 * this.state.position);
    const transform = `translateY(${translationAmount}%)`;
    const style = {
      transform: transform
    };
    const jukeTranslationAmount = -(100 * this.state.juke);
    const jukeTransform = `translateY(${jukeTranslationAmount}%)`;
    const jukeStyle = {
      transform: jukeTransform
    };
    const childCount = React.Children.count(this.props.children);
    return (
      <div className={styles.base}>
        {this.state.position != 0 && (
          <div className={styles.rightArrow} onClick={() => this.goUp()}>
            <Icon image={`${PUBLIC_IMAGES_PATH}/down.svg`} size={10} />
          </div>
        )}
        <Swipeable>
          <div className={styles.slider} style={jukeStyle}>
            <div style={style} className={styles.imageHolder}>
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

        {(this.state.position + 1) * 4 < childCount && childCount > 4 && (
          <div className={styles.leftArrow} onClick={() => this.goDown()}>
            <Icon image={`${PUBLIC_IMAGES_PATH}/down.svg`} size={10} />
          </div>
        )}
      </div>
    );
  }
}
