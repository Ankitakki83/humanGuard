import React, { Component } from "react";

const togglify = (NormalComponent, SelectedComponent, onToggle = null) => {
  return class SimpleToggle extends Component {
    constructor(props) {
      super(props);
      this.state = {
        clicked: false
      };
    }

    onClick = () => {
      let toggledState = !this.state.clicked;
      this.setState({ clicked: toggledState });
      if (onToggle) {
        onToggle(toggledState);
      }
    };

    render() {
      return this.state.clicked ? (
        <SelectedComponent
          onClick={() => {
            this.onClick();
          }}
        />
      ) : (
        <NormalComponent
          onClick={() => {
            this.onClick();
          }}
        />
      );
    }
  };
};
export default togglify;
