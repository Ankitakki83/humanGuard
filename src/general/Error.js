import React from "react";
import styles from "./Error.css";
import PropTypes from "prop-types";
export default class Error extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };
  constructor(props) {
    super(props);

    this.styles = this.props.styles ? this.props.styles : styles;
  }
  render() {
    return <div className={this.styles.base}> {this.props.message} </div>;
  }
}
