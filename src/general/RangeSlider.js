import React, { Component } from "react";
import PropTypes from "prop-types";
import { Range } from "rc-slider";
import "!style-loader!css-loader!rc-slider/assets/index.css";
class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }
  onChange = value => {
    this.setState({ value });
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.defaultValue[0] != this.props.defaultValue[0] ||
      prevProps.defaultValue[1] != this.props.defaultValue[1]
    ) {
      this.setState({ value: this.props.defaultValue });
    }
  }
  render() {
    return (
      <Range
        allowCross={this.props.allowCross}
        value={this.state.value}
        onAfterChange={this.props.onChange}
        onChange={this.onChange}
        handleStyle={this.props.handleStyle}
        trackStyle={this.props.trackStyle}
        railStyle={this.props.railStyle}
        min={this.props.min}
        max={this.props.max}
      />
    );
  }
}

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.array,
  handleStyle: PropTypes.array,
  trackStyle: PropTypes.array,
  railStyle: PropTypes.object,
  onChange: PropTypes.func,
  allowCross: PropTypes.bool
};

export default RangeSlider;
