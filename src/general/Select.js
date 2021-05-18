import React from "react";
import PropTypes from "prop-types";
import styles from "./Select.css";
import Icon from "./Icon";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
const BLACK = "black";
const WHITE = "white";
const GREY = "grey";
const HOLLOW_BOX = "hollowBox";
const WHITE_BOX = "whiteBox";
const BLACK_BOX = "blackBox";
const GREY_BOX = "greyBox";
export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
        ? this.props.value
        : this.props.placeholder
        ? this.props.placeholder
        : this.props.options
        ? this.props.options[0].value
        : "",
      label: this.props.label
        ? this.props.label
        : this.props.placeholder
        ? this.props.placeholder
        : this.props.options
        ? this.props.options[0].label
        : "",
      touched: false
    };
  }

  handleChange(event) {
    if (!this.props.disabled) {
      const selectedValue = event.target.value;
      const index = event.nativeEvent.target.selectedIndex;
      const selectedLabel = event.nativeEvent.target[index].label;
      const details = {};
      this.setState(
        { value: selectedValue, label: selectedLabel, touched: true },
        () => {
          if (this.props.onChange) {
            details.label = selectedLabel;
            details.value = selectedValue;
            this.props.onChange(details);
          }
        }
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value, label: nextProps.label });
      this.setState({ touched: true });
    } else if (!nextProps.value && this.state.value) {
      this.setState({
        value: this.props.placeholder,
        label: this.props.placeholder
      });
      this.setState({ touched: false });
    }
  }
  render() {
    let arrow = `${PUBLIC_IMAGES_PATH}/down.svg`;
    // if (this.props.arrowColour === BLACK) {
    //   arrow = BlackArrow;
    // }
    // if (this.props.arrowColour === GREY) {
    //   arrow = GreyArrow;
    // }
    // if (this.props.arrowColour === WHITE) {
    //   arrow = WhiteArrow;
    // }
    let themeClass = styles.base;
    if (this.props.disabled) {
      themeClass = styles.disabled;
    } else {
      themeClass = styles.base;
    }
    if (this.props.theme === BLACK_BOX) {
      if (this.props.disabled) {
        themeClass = styles.disabledBlack;
      } else {
        themeClass = styles.blackBox;
      }
    }
    if (this.props.theme === HOLLOW_BOX) {
      if (this.props.disabled) {
        themeClass = styles.disabledHollow;
      } else {
        themeClass = styles.hollowBox;
      }
    }
    if (this.props.theme === WHITE_BOX) {
      if (this.props.disabled) {
        themeClass = styles.disabledWhite;
      } else {
        themeClass = styles.whiteBox;
      }
    }
    if (this.props.theme === GREY_BOX) {
      if (this.props.disabled) {
        themeClass = styles.disabled;
      } else {
        themeClass = styles.base;
      }
    }
    return (
      <div
        className={themeClass}
        style={{
          height: this.props.height,
          lineHeight: `${this.props.height}px`,
          backgroundColor: this.props.backgroundColor,
          color: this.props.color,
          border: this.props.border,
          fontSize: this.props.fontSize
        }}
      >
        <select
          name={this.props.name}
          className={styles.hideSelect}
          onChange={event => this.handleChange(event)}
          value={this.state.value}
          label={this.state.label}
          aria-label={this.props.name}
        >
          <React.Fragment>
            {this.props.placeholder && !this.state.touched && (
              <option
                value={this.props.placeholder}
                label={this.props.placeholder}
                disabled
              >
                {this.props.placeholder}
              </option>
            )}
            {this.props.options &&
              this.props.options.map((item, i) => {
                return (
                  <option
                    styles={{
                      backgroundColor: "#000",
                      color: "fff",
                      cursor: "pointer"
                    }}
                    key={i}
                    value={item.value}
                    label={item.label}
                  >
                    {item.label}
                  </option>
                );
              })}
            {this.props.placeHolderOtherDetails && (
              <option
                value={this.props.placeHolderOtherDetails}
                label={this.props.placeHolderOtherDetails}
              >
                {this.props.placeHolderOtherDetails}
              </option>
            )}
          </React.Fragment>
        </select>
        <div className={styles.visibleBox}>
          {this.state.label ? this.state.label : this.state.value}
        </div>
        <div className={styles.arrow}>
          <Icon image={arrow} size={12} />
        </div>
      </div>
    );
  }
}
Select.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  border: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  arrowColour: PropTypes.oneOf([BLACK, GREY, WHITE]),
  theme: PropTypes.oneOf([HOLLOW_BOX, BLACK_BOX, GREY_BOX, WHITE_BOX]),
  disabled: PropTypes.bool
};
Select.defaultProps = {
  height: 35,
  arrowColour: GREY,
  disabled: false
};
