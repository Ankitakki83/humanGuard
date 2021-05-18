import React, { Component } from "react";
import styles from "./GeneralLoader.css";
class GeneralLoader extends Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default GeneralLoader;
