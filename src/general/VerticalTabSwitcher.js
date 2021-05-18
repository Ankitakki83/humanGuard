import React, { Component } from "react";
import styles from "./VerticalTabSwitcher.css";
import Icon from "./Icon";
import PropTypes from "prop-types";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";

class VerticalTabSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selected ? this.props.selected : 0
    };
  }

  showItem = selectedIndex => {
    if (this.state.selectedIndex === selectedIndex) {
      this.setState({ selectedIndex: "" });
    } else {
      this.setState({
        selectedIndex
      });
    }
  };

  render() {
    return (
      <div className={styles.base}>
        <div
          className={styles.wrapper}
          style={{
            width: this.props.tabWidth
          }}
        >
          {this.props.data &&
            this.props.data.map((item, id) => {
              return (
                <div className={styles.tabContentWrapper} key={id}>
                  <div
                    className={
                      this.state.selectedIndex === id
                        ? styles.tabWrapper
                        : styles.tabWrapperNotClicked
                    }
                    onClick={() => this.showItem(id)}
                  >
                    <div
                      className={
                        this.state.selectedIndex === id
                          ? styles.tabHeadingSelected
                          : styles.tabHeading
                      }
                    >
                      {item.title}
                    </div>
                    <div className={styles.iconWrapper}>
                      {this.state.selectedIndex === id && (
                        <Icon
                          image={`${PUBLIC_IMAGES_PATH}/down.svg`}
                          size={15}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={styles.contentWrapper}
          style={{
            width: this.props.contentWidth
          }}
        >
          <div className={styles.content}>
            {this.props.data[this.state.selectedIndex] &&
              this.props.data[this.state.selectedIndex].component}
          </div>
        </div>
      </div>
    );
  }
}

VerticalTabSwitcher.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        component: PropTypes.element
      })
    ),
    PropTypes.string
  ]),
  contentWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tabWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default VerticalTabSwitcher;
