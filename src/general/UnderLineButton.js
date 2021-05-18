import React from "react";
import PropTypes from "prop-types";
import styles from "./UnderLineButton.css";
class UnderLineButton extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div
          className={styles.actionButton}
          style={{ fontSize: this.props.fontSize }}
          onClick={this.props.onClick}
        >
          {this.props.label}
        </div>
      </div>
    );
  }
}
export default UnderLineButton;
UnderLineButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  fontSize: PropTypes.number
};
