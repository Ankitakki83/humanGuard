import React, { Component } from "react";
import styles from "./ErrorLabel.css";
import PropTypes from "prop-types";
class ErrorLabel extends Component {
  render() {
    return (
      <div
        className={styles.base}
        style={{
          height: this.props.height,
          fontSize: this.props.fontSize
        }}
      >
        {this.props.label}
      </div>
    );
  }
}
ErrorLabel.propTypes = {
  height: PropTypes.string,
  fontSize: PropTypes.string
};
ErrorLabel.defaultProps = {
  height: "25px"
};

export default ErrorLabel;
