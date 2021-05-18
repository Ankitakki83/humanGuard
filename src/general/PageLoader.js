import React from "react";
import PropTypes from "prop-types";
import styles from "./PageLoader.css";
export default class PageLoader extends React.Component {
  render() {
    return this.props.show ? (
      <div className={styles.base}>
        <div className={styles.loaderWrapper}>
          <div className={styles.loader} />
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
PageLoader.defaultProps = {
  show: true
};
PageLoader.propsTypes = {
  show: PropTypes.bool
};
