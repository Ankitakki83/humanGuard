import React from "react";
import styles from "./PaymentCheckoutWithTitle.css";
import isMobile from "../Utils/UserAgent";

export default class PaymentCheckoutWithTitle extends React.Component {
  onExpand = () => {
    this.props.onSelect();
  };
  render() {
    return (
      <div className={this.props.isSelected ? styles.desktop : styles.base}>
        <div className={styles.checkboxHeader} onClick={() => this.onExpand()}>
          <div className={styles.checkbox}>
            {this.props.isSelected && <div className={styles.blackTick} />}
          </div>
          <div className={styles.labelTitle}>{this.props.labelTitle}</div>
          <div className={styles.suffix}>{this.props.suffix}</div>
          <div className={styles.icon}>{this.props.icon}</div>
        </div>
        {this.props.isSelected && (
          <div className={styles.component}>{this.props.component}</div>
        )}
      </div>
    );
  }
}
