import React from "react";
import styles from "./CenteredContainer.css";
export default class CenteredContainer extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        {this.props.children}
      </div>
    );
  }
}
