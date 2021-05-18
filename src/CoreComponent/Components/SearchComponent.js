import React from "react";
import styles from "./css/SearchComponent.css";
import Input from "../../general/Input";
import Icon from "../../general/Icon";
import DesktopOnly from "../../general/DesktopOnly";
import MobileOnly from "../../general/MobileOnly";
import isMobile, { isArabicLanguageUrl } from "../../Utils/UserAgent";
import {
  PUBLIC_IMAGES_PATH,
  ADDRESS_VALIDATION_EXPRESSION,
  SPECIAL_CHARACTER_TOAST
} from "../../Utils/Constants";

export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: false,
      searchStart: false,
      value: "",
      close: true
    };
  }
  enterPressed = event => {
    if (event.key === "Enter") {
      if (!ADDRESS_VALIDATION_EXPRESSION.test(event.target.value)) {
        this.props.displayToast(SPECIAL_CHARACTER_TOAST);
        return false;
      }
      if (this.state.value.length > 0) {
        this.handleSubmit();
      }
    }
  };
  handleSubmit = () => {
    this.setState({ value: "" });
    this.props.history.push(`/filter?search=${this.state.value}`);
    this.onClick();
  };
  onChange = value => {
    if (!ADDRESS_VALIDATION_EXPRESSION.test(value)) {
      return false;
    }
    this.props.searchProduct(value);
    this.setState({
      value: value.trim()
    });
  };
  onFocused = () => {
    this.setState({
      searchStart: true
    });
  };
  onBlur = () => {
    this.setState({
      searchStart: false,
      value: ""
    });
  };

  onClick = () => {
    this.setState({
      searchBar: !this.state.searchBar,
      value: ""
    });
    if (this.state.searchBar === false && isMobile()) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };
  onClear = () => {
    this.setState({
      value: ""
    });
  };

  render() {
    let borderBottom = "1px solid #c6c6c6";
    if (this.state.searchStart) {
      borderBottom = "1px solid black";
    }
    let rightChild = "";
    if (this.state.value) {
      rightChild = (
        <div className={styles.clearContent} onClick={() => this.onClear()}>
          <Icon image={`${PUBLIC_IMAGES_PATH}/close.svg`} size={12} />
        </div>
      );
    }

    return (
      <div className={styles.base}>
        <MobileOnly>
          <div onClick={() => this.onClick()}>
            <Icon image={`${PUBLIC_IMAGES_PATH}/search.svg`} size={20} />
          </div>
          {this.state.searchBar ? (
            <div className={styles.inputWrapper}>
              <div className={styles.input} onSubmit={this.handleSubmit}>
                <div onClick={this.handleSubmit} className={styles.searchIcon}>
                  <Icon image={`${PUBLIC_IMAGES_PATH}/search.svg`} size={18} />
                </div>{" "}
                <div className={styles.inputCloseWrap}>
                  <Input
                    value={this.state.value}
                    onChange={value => this.onChange(value)}
                    placeholder={
                      isArabicLanguageUrl()
                        ? "عما تبحث؟"
                        : "What are you looking for?"
                    }
                    height={55}
                    fontSize={16}
                    maxLength={200}
                    background="white"
                    onKeyPress={this.enterPressed}
                    autoFocus={true}
                  />
                </div>
                {this.state.value.length > 0 && (
                  <div
                    onClick={() => this.onClear()}
                    className={styles.closeMobile}
                  >
                    <Icon image={`${PUBLIC_IMAGES_PATH}/close.svg`} size={15} />
                  </div>
                )}
              </div>

              <div
                className={styles.inputTransparentDiv}
                onClick={() => this.onClick()}
              />
            </div>
          ) : null}
        </MobileOnly>
        <DesktopOnly>
          <Input
            value={this.state.value}
            onChange={value => this.onChange(value)}
            onFocus={() => this.onFocused()}
            onBlur={() => this.onBlur()}
            placeholder={
              isArabicLanguageUrl() ? "عما تبحث؟" : "What are you looking for?"
            }
            fontSize={14}
            leftChild={
              <Icon image={`${PUBLIC_IMAGES_PATH}/search.svg`} size={21} />
            }
            rightChild={rightChild}
            borderBottom={borderBottom}
            onKeyPress={this.enterPressed}
          />
        </DesktopOnly>
      </div>
    );
  }
}
