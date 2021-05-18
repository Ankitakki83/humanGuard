import React from "react";
import track from "react-tracking";

const withPageLoadTracking = (Component, page: null, getPageLoadEventInfo) => {
  @track(
    props => {
      console.log("IS TRACK CALELD");
      if (getPageLoadEventInfo) {
        console.log("IS THE RIGHT IF CALLED");
        return getPageLoadEventInfo(page ? page : Component.displayName, props);
      } else {
        const defaultName =
          Component.displayName || Component.name || "Component";
        return {
          page: page ? page : defaultName
        };
      }
    },
    {
      dispatchOnMount: true
    }
  )
  class PageTrackedComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }
  return PageTrackedComponent;
};

export default withPageLoadTracking;
