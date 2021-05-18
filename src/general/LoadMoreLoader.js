import React, { Component } from "react";
import styles from "./LoadMoreLoader.css";
import { FormattedMessage } from "react-intl";
import CoreMessages from "../CoreComponent/Messages/CoreMessages";
class LoadMoreLoader extends Component {
  render() {
    return (
      <div
        className={styles.base}
        style={{
          position: this.props.position,
          height: this.props.height,
          left: this.props.left,
          right: this.props.right,
          bottom: this.props.bottom,
          top: this.props.top
        }}
      >
        <div className={styles.loaderContentWrapper}>
          <div className={styles.heading}>
            <FormattedMessage {...CoreMessages.LoadingMoreItems} />
          </div>
          <div className={styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadMoreLoader;
