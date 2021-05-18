import React from "react";
import PropTypes from "prop-types";
import styles from "./Icon.css";
import VisibilityChild from "./VisibilityChild";

export default class Icon extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.image === nextProps.image) {
  //     return false;
  //   }
  // }
  render() {
    return (
      <VisibilityChild>
        <div
          className={styles.base}
          style={{ width: this.props.size, height: this.props.size }}
        >
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${this.props.image})`,
              backgroundSize: `${this.props.backgroundSize}`,
            }}
          />
        </div>
      </VisibilityChild>
    );
  }
}

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  backgroundSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  size: 30,
  backgroundSize: "contain",
};
