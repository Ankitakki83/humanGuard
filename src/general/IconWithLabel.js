import React from "react";
import PropTypes from "prop-types";
import styles from "./IconWithLabel.css";
const CENTER = "center"; // all text will come in center
const LEFT = "left"; // all text will come in left (default behavior)
const RIGHT = "right"; // all text will come in right

export default class IconWithLabel extends React.Component {
  render() {
    let className = styles.base;
    let alignClass = styles.centerAlign,
      iconPositionClass = "";
    if (this.props.textAlign === LEFT) {
      alignClass = styles.centerAlign;
    } else if (this.props.textAlign === RIGHT) {
      alignClass = styles.rightAlign;
    }
    if (this.props.iconPosition === RIGHT) {
      iconPositionClass = styles.iconLeft;
    }

    return (
      <div
        className={`${className} ${alignClass} ${iconPositionClass}`}
        style={{
          backgroundColor: this.props.backgroundColor,
          fontSize: this.props.fontSize,
          color: this.props.color,
          height: this.props.height
        }}
        onClick={this.props.onClick}
      >
        <div className={styles.icon}>{this.props.icon}</div>
        <div className={styles.label}>{this.props.label}</div>
      </div>
    );
  }
}

IconWithLabel.propTypes = {
  icon: PropTypes.any,
  fontSize: PropTypes.number,
  label: PropTypes.object,
  height: PropTypes.number,
  onClick: PropTypes.func,
  textAlign: PropTypes.oneOf([LEFT, RIGHT, CENTER]),
  iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
  color: PropTypes.string,
  backgroundColor: PropTypes.string
};

IconWithLabel.defaultProps = {
  fontSize: 16,
  height: 50,
  color: "black",
  backgroundColor: "#d9d9d9"
};
