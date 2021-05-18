import React, { Component } from "react";
import styles from "./CircleWithLabel.css";
import Icon from "./Icon";
import PropTypes from "prop-types";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
class CircleWithLabel extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  render() {
    return (
      <div
        className={styles.base}
        style={{ height: this.props.height }}
        onClick={this.handleClick}
      >
        <div className={styles.tickIcon}>
          {this.props.selected && (
            <Icon
              image={`${PUBLIC_IMAGES_PATH}/tick.svg`}
              size={this.props.tickSize}
            />
          )}
        </div>
        <div
          className={
            this.props.selected === true
              ? styles.selectedLabel
              : styles.notSelectedLabel
          }
        >
          {this.props.label}
        </div>
      </div>
    );
  }
}

CircleWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tickSize: PropTypes.number
};
CircleWithLabel.defaultProps = {
  height: 78,
  selected: false,
  tickSize: 20
};
export default CircleWithLabel;
