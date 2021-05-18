import React from "react";
import track from "react-tracking";
import pick from "lodash.pick";
import clonedeep from "lodash.clonedeep";
const withClickTracking = (
  Component,
  clickHandlerPropName,
  eventDataProps: [],
  eventDataFunction
) => {
  class ClickTrackedComponent extends React.Component {
    render() {
      const clickHandlerFunction = this.props[clickHandlerPropName];

      if (!clickHandlerFunction) {
        throw new Error("No Click Handler present");
      }
      const handler = () => {
        clickHandlerFunction();

        // when it is actually clicked
        // we want to track an event
        // on click, we want to extract out the correct properties
        // and we want to get those values and put them into an object that can be used by the event data function.
        let eventData;
        if (eventDataProps) {
          eventData = pick(this.props, [...eventDataProps, "eventName"]);
        } else {
          eventData = {
            eventName: this.props.eventName
          };
        }
        if (this.props.eventName) {
          this.props.tracking.trackEvent(eventDataFunction(eventData));
        }
      };

      let newProps = clonedeep(this.props);
      newProps[clickHandlerPropName] = handler;
      return <Component {...newProps} />;
    }
  }

  return track({})(ClickTrackedComponent);
};

export default withClickTracking;
