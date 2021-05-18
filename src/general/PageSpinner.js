import React from "react";

export default class PageSpinner extends React.Component {
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          top: "50%",
          left: "50%"
        }}
      >
        Loading..
      </div>
    );
  }
}
