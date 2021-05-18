import React from "react";
import track from "react-tracking";

@track(
  {},
  {
    dispatch: ownedTrackingData => {
      console.log("OWNED TRACKING DATA");
      console.log(ownedTrackingData);
    }
  }
)
export default class TrackedApp extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
