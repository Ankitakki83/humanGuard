import React, { Component } from "react";
import PropTypes from "prop-types";

let multiItems = [];
export default class NormalMultiSelect extends Component {
  constructor(props) {
    super(props);
    // Set selected items initialy.
    this.state = {
      selected: []
    };
  }
  onClick = (value, index) => {
    if (index > -1) {
      let newSelected = this.state.selected;
      let foundAt = newSelected.indexOf(index);
      if (foundAt > -1) {
        if (!value) {
          newSelected.splice(foundAt, 1);
        }
      } else {
        if (value) {
          newSelected.push(index);
        }
      }
      this.setState({ selected: newSelected }, () => {
        if (this.props.onSelect) {
          this.props.onSelect(this.state.selected);
        }
      });
    }
  };
  render() {
    let itemProps = this.props.itemProps || {};
    if (this.props.children && this.props.children.length > 0) {
      let selectedItems = this.state.selected;
      for (let i = 0; i < this.props.children.length; i++) {
        let checkSelected = selectedItems.indexOf(i) !== -1;
        multiItems[i] = {
          child: this.props.children[i],
          selected: checkSelected
        };
      }
    }
    return (
      <React.Fragment>
        {multiItems.map((item, i) =>
          React.cloneElement(item.child, {
            onClick: () => {
              this.onClick(!item.selected, i);
            }
          })
        )}
      </React.Fragment>
    );
  }
}
NormalMultiSelect.propTypes = {
  onSelect: PropTypes.func.isRequired
};
