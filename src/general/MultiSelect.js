import React from "react";
import styles from "./MultiSelect.css";
import PropTypes from "prop-types";
export default class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.styles = this.props.styles ? this.props.styles : styles;
  }
  // selectItem(value) {
  //   let selectedArray = this.props.selected;
  //   if (this.props.selected.includes(value)) {
  //     remove(selectedArray, i => {
  //       return value === i;
  //     });
  //   } else {
  //     if (selectedArray.length < this.props.limit || !this.props.limit) {
  //       selectedArray.push(value);
  //     } else {
  //       selectedArray = selectedArray.slice(1, this.props.limit);
  //       selectedArray.push(value);
  //     }
  //   }
  //   if (this.props.onChange) {
  //     this.props.onChange(selectedArray);
  //   }
  // }
  render() {
    const children = this.props.children;
    const childrenWithProps = React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        selected: this.props.selected.includes(child.props.value),
        index: i,
        selectItem: i => {
          this.selectItem(child.props.value);
        }
      });
    });
    return (
      <div className={this.styles.base}>
        {childrenWithProps}
      </div>
    );
  }
}
MultiSelect.propTypes = {
  selected: PropTypes.array,
  limit: PropTypes.number
};
MultiSelect.defaultProps = {
  selected: []
};
