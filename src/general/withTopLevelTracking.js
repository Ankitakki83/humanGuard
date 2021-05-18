import React from "react";
import track from "react-tracking";

const withTopLevelTracking = (Component, topLevelTrackingFunction: null) => {
  class TrackedApp extends React.Component {
    render() {
      return <Component />;
    }
  }

  return track(
    {},
    {
      dispatch: ownedTrackingData => {
        if (topLevelTrackingFunction) {
          topLevelTrackingFunction(ownedTrackingData);
        } else {
          console.log("OWNED TRACKING DATA");
          console.log(ownedTrackingData);
        }
      }
    }
  )(TrackedApp);
};

export default withTopLevelTracking;
