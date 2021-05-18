import React, { Component } from "react";
import styles from "./LabelWithCheckStrip.css";
import Icon from "./Icon";
import PropTypes from "prop-types";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import { isArabicLanguageUrl } from "../Utils/UserAgent";
class LabelWithCheckStrip extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  render() {
    return (
      <div
        className={styles.base}
        style={{
          height: this.props.height,
          borderBottom: this.props.borderBottom
        }}
        onClick={this.handleClick}
      >
        <div
          className={
            this.props.selected === true
              ? styles.selectedLabel
              : styles.notSelectedLabel
          }
        >
          {this.props.label}
        </div>

        <div
          className={
            !this.props.showNestedIcon && this.props.selected
              ? styles.iconTick
              : styles.tickIcon
          }
          style={
            isArabicLanguageUrl()
              ? {
                  left: this.props.showNestedIcon
                    ? this.props.positionRightTick
                    : this.props.positionRightSelected
                }
              : {
                  right: this.props.showNestedIcon
                    ? this.props.positionRightTick
                    : this.props.positionRightSelected
                }
          }
        >
          {this.props.showNestedIcon && (
            <Icon
              image={`${PUBLIC_IMAGES_PATH}/right-arrow.svg`}
              size={this.props.tickSize}
            />
          )}
          {!this.props.showNestedIcon && this.props.selected && (
            <Icon
              image={`${PUBLIC_IMAGES_PATH}/tick.svg`}
              size={this.props.selectedTickSize}
            />
          )}
        </div>
      </div>
    );
  }
}

LabelWithCheckStrip.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tickSize: PropTypes.number,
  showNestedIcon: PropTypes.bool,
  onClick: PropTypes.func,
  positionRightTick: PropTypes.number,
  positionRightSelected: PropTypes.number,
  selectedTickSize: PropTypes.number,
  borderBottom: PropTypes.string
};
LabelWithCheckStrip.defaultProps = {
  selected: false,
  height: 78,
  tickSize: 12,
  showNestedIcon: false,
  positionRightTick: 10,
  positionRightSelected: 40,
  selectedTickSize: 12,
  borderBottom: "solid 0.5px #c6c6c6;"
};
export default LabelWithCheckStrip;
