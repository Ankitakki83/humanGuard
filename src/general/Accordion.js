import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Accordion.css";
import Icon from "./Icon";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: ""
    };
  }

  onExpend = selectedIndex => {
    if (this.state.selectedIndex === selectedIndex) {
      this.setState({ selectedIndex: "" });
    } else {
      this.setState({
        selectedIndex
      });
    }
  };

  navigateToUrl = url => {
    if (url) {
      this.props.history.push(url);
    }
  };

  render() {
    const { data } = this.props;

    return (
      <div className={styles.base}>
        {data &&
          data.map((item, key) => {
            return (
              <React.Fragment key={key}>
                <div
                  key={key}
                  className={styles.container}
                  onClick={() =>
                    item.component
                      ? this.onExpend(key)
                      : this.navigateToUrl(item.url)
                  }
                >
                  {item.title}
                  <span
                    className={
                      this.state.selectedIndex === key
                        ? styles.svgChange
                        : styles.svgIcon
                    }
                  >
                    {item.component && (
                      <Icon
                        image={`${PUBLIC_IMAGES_PATH}/down.svg`}
                        size={15}
                      />
                    )}
                  </span>
                </div>
                {this.state.selectedIndex === key && (
                  <div className={styles.panel}>
                    {data[this.state.selectedIndex].component}
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
    );
  }
}

Accordion.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        component: PropTypes.element,
        url: PropTypes.string
      })
    ),
    PropTypes.string
  ])
};
export default withRouter(Accordion);
