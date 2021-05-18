import React from "react";
import PropTypes from "prop-types";
import styles from "./HorizontalSlider.css";

export default class HorizontalSlider extends React.Component {
  render() {
    if (!this.props.children) {
      console.error("No Children passed");
      return <div />;
    }
    return (
      <div className={styles.base}>
        {this.props.headerComponent && this.props.headerComponent}
        <div className={this.props.sliderStyle}>
          {this.props.children &&
            this.props.children.map((child, i) => {
              return (
                <div
                  className={styles.element}
                  style={{
                    width:
                      this.props.elementWidth === "auto"
                        ? "auto"
                        : `${this.props.elementWidth}%`
                  }}
                  key={i}
                >
                  {child}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
HorizontalSlider.propTypes = {
  elementWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
