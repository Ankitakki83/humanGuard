import React from "react";
import styles from "./Tag.css";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
class Tag extends React.Component {
  render() {
    return (
      <div className={styles.base} onClick={this.props.onClick}>
        <div
          className={styles.tag}
          style={{
            fontSize: this.props.fontSize,
            padding: this.props.padding
          }}
        >
          {this.props.label}
        </div>
        <div className={styles.iconWrapper}>
          <Icon image={`${PUBLIC_IMAGES_PATH}/close.svg`} size={10} />
        </div>
      </div>
    );
  }
}
export default Tag;
Tag.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  fontSize: PropTypes.number,
  padding: PropTypes.number
};
