import React from "react";
import PropTypes from "prop-types";
import defaultStyles from "./Column.css";

export default class Column extends React.Component {
  render() {
    const styles = this.props.styles ? this.props.styles : defaultStyles;
    let className = styles.base;
    if (this.props.alignVertical === "bottom") {
      className = styles.bottom;
    }

    if (this.props.alignVertical === "center") {
      className = styles.verticalCenter;
    }

    if (this.props.alignVertical === "stretch") {
      className = styles.stretch;
    }

    if (this.props.alignVertical === "top") {
      className = styles.top;
    }

    if (this.props.alignHorizontal === "center") {
      className = `${styles.horizontalCenter} ${className}`;
    }

    if (this.props.alignHorizontal === "left") {
      className = `${styles.left} ${className}`;
    }

    if (this.props.alignHorizontal === "right") {
      className = `${styles.right} ${className}`;
    }

    return (
      <div
        className={className}
        style={{ height: this.props.height, width: this.props.width }}
      />
    );
  }
}

Column.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alignHorizontal: PropTypes.string,
  alignVertical: PropTypes.string
};

Column.defaultProps = {
  width: "auto",
  height: "auto",
  alignHorizontal: "left",
  alignVertical: "top"
};
