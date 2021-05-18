import React from "react";
import isMobile from "../Utils/UserAgent";
export default class DesktopOnly extends React.Component {
  render() {
    return !isMobile() ? this.props.children : <div />;
  }
}
