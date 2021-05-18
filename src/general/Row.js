import React from "react";
import PropTypes from "prop-types";
import defaultStyles from "./Row.css";

export default class Row extends React.Component {
  render() {
    let styles = this.props.styles ? this.props.styles : defaultStyles;
    let className = styles.base;
    if (this.props.alignHorizontal === "right") {
      className = styles.right;
    }

    if (this.props.alignHorizontal === "left") {
      className = styles.left;
    }

    if (this.props.alignHorizontal === "center") {
      className = styles.horizontalCenter;
    }

    if (this.props.alignVertical === "top") {
      className = `${styles.top} ${className}`;
    }

    if (this.props.alignVertical === "bottom") {
      className = `${styles.bottom} {className}`;
    }

    if (this.props.alignVertical === "center") {
      className = `${styles.verticalCenter} {className}`;
    }

    if (this.props.alignVertical === "stretch") {
      className = `${styles.stretch} ${className}`;
    }

    if (this.props.wrap === true) {
      className = `${styles.wrap} ${className}`;
    }

    return (
      <div className={className} style={{ height: this.props.height }}>
        {this.props.children}
      </div>
    );
  }
}

Row.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.bool,
  alignHorizontal: PropTypes.string,
  alignVertical: PropTypes.string
};

Row.defaultProps = {
  height: "auto",
  wrap: false,
  alignHorizontal: "left",
  alignVertical: "top"
};
