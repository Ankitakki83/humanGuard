import React from "react";
import PropTypes from "prop-types";
import defaultStyles from "./MultiSelectItem.css";

export default class MultiSelectItem extends React.Component {
  handleClick() {
    if (this.props.selectItem) {
      this.props.selectItem(this.props.value);
    }
  }
  render() {
    const styles = this.props.styles ? this.props.styles : defaultStyles;
    let className = styles.base;
    if (this.props.selected) {
      className = styles.selected;
    }

    return (
      <div className={className} onClick={() => this.handleClick()}>
        {this.props.label}
      </div>
    );
  }
}
MultiSelectItem.propTypes = {
  selectItem: PropTypes.func,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

MultiSelectItem.defaultProps = {
  selected: []
};
