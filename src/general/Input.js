import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.css";
import { TWO_DECIMAL_POINT_NUMBER_REG_EX } from "../Utils/Constants";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : "",
      disabled: this.props.disabled,
      focused: false
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      });
    }
  }
  handleChange(event) {
    const NUMBER_REGEX = /^[0-9]+$/;
    const NUMBER_DECIMAL = /^[1-9]+[0-9.]*$/;
    const ALPHABET_REGEX = /^[a-zA-Z ]+$/;
    const CARD_REGEX = /^[0-9\s]+$/;
    const ALPHANUMERIC_VALIDATION_EXPRESSION = /^[a-zA-Z0-9]+$/;
    const SPECIAL_CHARACTER_EXPRESSION = /^[a-z0-9-_@.,&#]+$/i;
    const TWO_DECIMAL_POINT_NUMBER_REG_EX = /^[0-9]*(\.[0-9]{0,2})?$/;
    const string = event.target.value;
    let stringWithoutEmojies;
    if (this.props.disabledEmojie) {
      stringWithoutEmojies = string.replace(
        /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      );
    } else {
      stringWithoutEmojies = string;
    }
    if (this.props.disabledEmojie && string !== stringWithoutEmojies) {
      return false;
    }
    if (event.target.value === " ") {
      return false;
    }

    if (this.props.isVoucher) {
      if (
        event.target.value === "" ||
        SPECIAL_CHARACTER_EXPRESSION.test(event.target.value)
      ) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(stringWithoutEmojies);
          }
        });
      } else {
        event.preventDefault();
      }
      return;
    }
    if (this.props.isAlphanumeric) {
      if (
        event.target.value === "" ||
        ALPHANUMERIC_VALIDATION_EXPRESSION.test(event.target.value)
      ) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(stringWithoutEmojies);
          }
        });
      } else {
        event.preventDefault();
      }
      return;
    }
    if (this.props.isCard) {
      if (event.target.value === "" || CARD_REGEX.test(event.target.value)) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(stringWithoutEmojies);
          }
        });
      } else {
        event.preventDefault();
      }
      return;
    }
    if (this.props.onlyNumber) {
      if (event.target.value === "" || NUMBER_REGEX.test(event.target.value)) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(stringWithoutEmojies);
          }
        });
      } else {
        event.preventDefault();
      }
    }
    if (this.props.twoDecimalOnly) {
      if (
        event.target.value === "" ||
        (TWO_DECIMAL_POINT_NUMBER_REG_EX.test(event.target.value) &&
          NUMBER_DECIMAL.test(event.target.value))
      ) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(stringWithoutEmojies);
          }
        });
      } else {
        event.preventDefault();
        return;
      }
    }
    if (this.props.onlyAlphabet) {
      if (
        event.target.value === "" ||
        ALPHABET_REGEX.test(event.target.value)
      ) {
        this.setState({ value: event.target.value }, () => {
          if (this.props.onChange) {
            this.props.onChange(stringWithoutEmojies);
          }
        });
      } else {
        event.preventDefault();
      }
    }
    if (
      !this.props.onlyAlphabet &&
      !this.props.onlyNumber &&
      !this.props.isCard &&
      !this.props.isAlphanumeric &&
      !this.props.isVoucher
    ) {
      this.setState({ value: event.target.value }, () => {
        if (this.props.onChange) {
          this.props.onChange(stringWithoutEmojies);
        }
      });
    }
  }
  handleFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ focused: true });
  }
  handleBlur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({ focused: false });
  }
  render() {
    var { leftChild, rightChild, placeholder, type, height } = this.props;
    let boxBorderStyle = {
      height: this.props.height,
      border: this.props.borderColor
        ? `1px solid ${this.props.borderColor}`
        : "none"
    };
    if (this.props.border) {
      Object.assign(boxBorderStyle, {
        border: this.props.border
      });
    }
    if (this.props.borderBottom) {
      Object.assign(boxBorderStyle, {
        borderBottom: this.props.borderBottom
      });
    }
    let className = styles.base;

    if (this.props.disabled) {
      className = styles.disabled;
    }

    if (this.props.hollow) {
      className = styles.hollow;
    }
    return (
      <div className={className} style={boxBorderStyle}>
        {leftChild && <div className={styles.leftChild}>{leftChild}</div>}
        <input
          autoFocus={this.props.autoFocus}
          maxLength={this.props.maxLength}
          type={type}
          value={this.state.value}
          className={this.props.makePayment ? styles.paymentAmount : styles.box}
          onChange={event => this.handleChange(event)}
          onFocus={event => this.handleFocus(event)}
          onBlur={event => this.handleBlur(event)}
          placeholder={placeholder}
          onKeyPress={this.props.onKeyPress}
          style={{
            fontFamily: this.props.fontFamily,
            fontSize: this.props.fontSize,
            color: this.props.color,
            background: this.props.background
          }}
          aria-label={this.props.ariaLabel}
        />
        {rightChild && <div className={styles.rightChild}>{rightChild}</div>}
      </div>
    );
  }
}

Input.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.bool,
  borderBottom: PropTypes.string,
  ariaLabel: PropTypes.string,
  background: PropTypes.string,
  onKeyPress: PropTypes.func,
  disabledEmojie: PropTypes.bool
};

Input.defaultProps = {
  disabled: false,
  disabledEmojie: true,
  border: false,
  ariaLabel: "Label"
};

export default Input;
