import React from "react";
import styles from "./css/BlogComponent.css";
import Image from "../../general/Image";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";
import Icon from "../../general/Icon";

const data = [
  HomeMessages.whyUsTextOne,
  HomeMessages.whyUsTextTwo,
  // HomeMessages.whuUsTextThree,
  // HomeMessages.whyUsTextFour,
  // HomeMessages.whyUsTextFive,
  // HomeMessages.whyUsTextSix,
  // HomeMessages.whyUsTextSeven,
  // HomeMessages.whyUsTextEight,
];

export default class WhyUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  renderSection = (text) => {
    return (
      <div className={styles.blogWrapper}>
        <div className={styles.blog}>
          <FormattedMessage {...text} />
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.autoRun();
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  autoRun = () => {
    this.interval = setTimeout(() => {
      this.handleNextClick();
      this.autoRun();
    }, 4000);
  };

  handleNextClick = () => {
    if (this.state.current < data.length - 1) {
      this.setState({ current: this.state.current + 1 });
    } else {
      this.setState({ current: 0 });
    }
  };

  handlePreviousClick = () => {
    this.state.current > 0 &&
      this.setState({ current: this.state.current - 1 });
  };

  render() {
    let { current } = this.state;
    return (
      <div className={styles.base} id="whyus">
        <div className={styles.background}>
          <Image src={`${PUBLIC_ASSETS_PATH}/blog.jpg`} paddingBottom="100vh" />
        </div>
        <div className={styles.backgroundMobile}>
          <Image src={`${PUBLIC_ASSETS_PATH}/blog.jpg`} paddingBottom="0vh" />
        </div>
        <div className={styles.information}>
          <div className={styles.blogHeading}>
            <h2 className={styles.heading}>
              <FormattedMessage {...HomeMessages.whyUsHeading} />
            </h2>
          </div>
          <div className={styles.carouselWrapper}>
            <button
              className={styles.navigationButton}
              onClick={this.handlePreviousClick}
            >
              <Icon image={`${PUBLIC_ASSETS_PATH}/prev.svg`} size={30} />
            </button>
            {this.renderSection(data[current])}
            <button
              className={styles.navigationButton}
              onClick={this.handleNextClick}
            >
              <Icon image={`${PUBLIC_ASSETS_PATH}/next.svg`} size={30} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
