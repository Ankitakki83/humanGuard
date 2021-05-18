import React from "react";
import styles from "./Skeleton.css";
class Skeleton extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.overlay} />
        {this.props.children}
      </div>
    );
  }
}

export default Skeleton;
