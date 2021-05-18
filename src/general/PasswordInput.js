import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import CircleButton from "./CircleButton";
import Icon from "./Icon";
import defaultShowPasswordIcon from "./img/40.svg";
import defaultHidePasswordIcon from "./img/40Red.svg";
export default class PasswordInput extends Component {
  state = {
    showPassword: false
  };

  onShowPassword = () => {
    const showPassword = this.state.showPassword;
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const {
      hidePasswordIcon,
      showPasswordIcon,
      circleButtonColor,
      circleButtonSize,
      iconSize,
      ...rest
    } = this.props;
    const HidePasswordIcon = hidePasswordIcon
      ? hidePasswordIcon
      : defaultHidePasswordIcon;
    const ShowPasswordIcon = showPasswordIcon
      ? showPasswordIcon
      : defaultShowPasswordIcon;
    return (
      <Input
        type={this.state.showPassword ? "text" : "password"}
        {...rest}
        rightChild={
          <CircleButton
            color={circleButtonColor}
            size={circleButtonSize}
            icon={
              <Icon
                image={
                  this.state.showPassword ? HidePasswordIcon : ShowPasswordIcon
                }
                size={iconSize}
              />
            }
            onClick={() => this.onShowPassword()}
          />
        }
      />
    );
  }
}

PasswordInput.propTypes = {
  hidePasswordIcon: PropTypes.string,
  showPasswordIcon: PropTypes.string,
  iconSize: PropTypes.number,
  circleButtonColor: PropTypes.string,
  circleButtonSize: PropTypes.number
};

PasswordInput.defaultProps = {
  iconSize: 30,
  circleButtonColor: "#fffff",
  circleButtonSize: 40
};
