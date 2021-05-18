import React from "react";
import styles from "./css/FeatureTwoBanner.css";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";
import Image from "../../general/Image";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import Icon from "../../general/Icon";
const leftSection = [
  {
    icon: "f1.svg",
    title: <FormattedMessage {...HomeMessages.f1} />,
    desc: <FormattedMessage {...HomeMessages.fd1} />,
  },
  {
    icon: "f2.svg",
    title: <FormattedMessage {...HomeMessages.f2} />,
    desc: <FormattedMessage {...HomeMessages.fd2} />,
  },
  {
    icon: "f3.svg",
    title: <FormattedMessage {...HomeMessages.f3} />,
    desc: <FormattedMessage {...HomeMessages.fd3} />,
  },
];
const rightSection = [
  {
    icon: "f4.svg",
    title: <FormattedMessage {...HomeMessages.f4} />,
    desc: <FormattedMessage {...HomeMessages.fd4} />,
  },
  {
    icon: "f5.svg",
    title: <FormattedMessage {...HomeMessages.f5} />,
    desc: <FormattedMessage {...HomeMessages.fd5} />,
  },
  {
    icon: "f6.svg",
    title: <FormattedMessage {...HomeMessages.f6} />,
    desc: <FormattedMessage {...HomeMessages.fd6} />,
  },
];
export default class FeatureTwoBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateY: 0,
    };
  }
  handleScroll = () => {
    if (
      document.documentElement.scrollTop < window.innerHeight * 3 &&
      document.documentElement.scrollTop > window.innerHeight * 2
    ) {
      this.setState({
        translateY:
          (document.documentElement.scrollTop - window.innerHeight * 3) / 1.5,
      });
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll");
  }
  renderLeftSection = () => {
    return leftSection.map((item, id) => {
      return (
        <div className={styles.smallCard}>
          <div className={styles.leftCard}>
            <h2 className={styles.dark}>{item.title}</h2>
            <p className={styles.desc}>{item.desc}</p>
          </div>
          <div className={styles.rightCard}>
            <div className={styles.iconWrapper}>
              <Icon image={`${PUBLIC_ASSETS_PATH}/${item.icon}`} size={25} />
            </div>
          </div>
        </div>
      );
    });
  };
  renderRightSection = () => {
    return rightSection.map((item, id) => {
      return (
        <div className={styles.smallCard}>
          <div className={styles.rightCard}>
            <div className={styles.iconWrapper}>
              <Icon image={`${PUBLIC_ASSETS_PATH}/${item.icon}`} size={25} />
            </div>
          </div>
          <div className={styles.leftCardWithRight}>
            <h2 className={styles.dark}>{item.title}</h2>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className={styles.base} id="pages">
        <div className={styles.topSection}>
          <h1 className={styles.dark}>
            <FormattedMessage {...HomeMessages.richFeatureHeading} />
          </h1>
          <p className={styles.richFeature}>
            <FormattedMessage {...HomeMessages.richFeatureDes} />
          </p>
        </div>
        <hr className={styles.divider} />
        <div className={styles.infoWrapper}>
          <div className={styles.imageFrame}>
            <div
              className={styles.backgroundImage}
              style={{
                transform: `translateY(${this.state.translateY}px)`,
              }}
            >
              <Image
                src={`${PUBLIC_ASSETS_PATH}/mobileWallpaper.jpg`}
                paddingBottom={"100vh"}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.leftInfo}>{this.renderLeftSection()}</div>
            <div className={styles.imageWrapper}>
              <div className={styles.image}>
                <Image
                  src={`${PUBLIC_ASSETS_PATH}/mobile.png`}
                  paddingBottom="450px"
                />
              </div>
            </div>
            <div className={styles.rightInfo}>{this.renderRightSection()}</div>
          </div>
        </div>
      </div>
    );
  }
}
