import React from "react";
import Observer from "@researchgate/react-intersection-observer";

export default class VisibilityChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: window.isBot ? true : true,
    };
  }

  handleIntersection = (event) => {
    this.setState({ visible: event.isIntersecting });
  };
  render() {
    // return <div className="lazy">{this.props.children}</div>;
    const options = {
      onChange: this.handleIntersection,
      rootMargin: "0% 0% -5%",
    };
    return !this.state.visible ? (
      <Observer {...options}>
        <div style={{ minHeight: 50 }} />
      </Observer>
    ) : (
      this.props.children
    );
  }
}
