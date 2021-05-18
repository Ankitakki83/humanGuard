import React from "react";
import styles from "./StaticPageWidth.css";
class StaticPageWidth extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.widthWrapper}>{this.props.children}</div>
      </div>
    );
  }
}
export default StaticPageWidth;
