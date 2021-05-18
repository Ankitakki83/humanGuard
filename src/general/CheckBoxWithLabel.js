import React from "react";
import styles from "./CheckBoxWithLabel.css";
import PropTypes from "prop-types";
class CheckBoxWithLabel extends React.Component {
  render() {
    return (
      <div className={styles.base} onClick={this.props.onClick}>
        <div className={styles.checkBoxContent}>
          {this.props.selected && <div className={styles.tick} />}
        </div>
        {this.props.colorCode && (
          <div
            className={styles.circle}
            style={{ backgroundColor: this.props.colorCode }}
          />
        )}
        <div
          className={styles.categoryName}
          style={{
            fontFamily: this.props.selected
              ? "ProximaNova-Semibold"
              : "Proxima Nova"
          }}
        >
          {this.props.label}
        </div>
      </div>
    );
  }
}
export default CheckBoxWithLabel;
CheckBoxWithLabel.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};
