import React, { Component } from "react";
import styles from "./DesktopCartHeader.css";
class DesktopCartHeader extends Component {
  renderHeaderTitle = () => {
    return (
      <div className={styles.headerTitleWrapper}>
        {this.props.titles &&
          this.props.titles.map((title, id) => {
            return (
              <div
                className={
                  this.props.selectedIndex && this.props.selectedIndex >= id
                    ? styles.headerTitleSelected
                    : styles.headerTitle
                }
                key={id}
              >
                <div className={styles.title}>{title}</div>
                <div
                  className={
                    this.props.selectedIndex && this.props.selectedIndex >= id
                      ? styles.bottomTabSelected
                      : styles.bottomTab
                  }
                />
              </div>
            );
          })}
      </div>
    );
  };
  render() {
    return <div className={styles.base}>{this.renderHeaderTitle()}</div>;
  }
}

export default DesktopCartHeader;
