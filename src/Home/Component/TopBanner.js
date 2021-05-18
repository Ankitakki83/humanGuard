import React from "react";
import styles from "./css/TopBanner.css";
import Image from "../../general/Image";

import CarouselBanner from "../../general/CarouselBanner";

import { isArabicLanguageUrl } from "../../Utils/UserAgent";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";
import Icon from "../../general/Icon";
import VisibilityChild from "../../general/VisibilityChild";

const images = ["topBanner1.jpg", "topBanner2.jpg", "topBanner3.jpg"];
class TopBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      juke: 0,
      position: 0,
      setJuke: false,
    };
  }
  changePosition(i, count) {
    if (i !== undefined) {
      this.setState({ juke: count }, () => {
        this.setState({ position: i });
      });
    }
  }
  componentDidMount() {
    this.autoRun();
  }

  autoRun = () => {
    this.interval = setTimeout(() => {
      this.goForward();
      this.autoRun();
    }, 4000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  scrollTopBanner = () => {
    window.scrollTo(0, window.innerHeight);
  };

  goForward = (count) => {
    const componentData = images;
    const childCount = componentData.length;
    if ((Math.abs(this.state.position) + 1) % childCount === 0) {
      this.setState(
        {
          juke: this.state.juke - childCount,
        },
        () => {
          this.setState({ position: this.state.position + 1 });
        }
      );
    } else {
      this.setState({ position: this.state.position + 1 });
    }
  };
  goBack = (count) => {
    const childCount = count;
    if (Math.abs(this.state.position) === Math.abs(this.state.juke)) {
      this.setState(
        {
          juke: this.state.juke + childCount,
        },
        () => {
          this.setState({ position: this.state.position - 1 });
        }
      );
    } else {
      this.setState({ position: this.state.position - 1 });
    }
  };
  renderFirstCard = () => {
    return (
      <div className={styles.card}>
        <Image
          src={`${PUBLIC_ASSETS_PATH}/${images[0]}`}
          paddingBottom={"100vh"}
        />
        <div className={styles.cardOneDescription}>
          <h1 style={{ color: "black" }}>
            <FormattedMessage {...HomeMessages.headingOne} />
          </h1>
          <p style={{ color: "black" }}>
            <FormattedMessage {...HomeMessages.subHeadingOne} />
          </p>
        </div>
      </div>
    );
  };
  renderSecondCard = () => {
    return (
      <div className={styles.card}>
        <Image
          src={`${PUBLIC_ASSETS_PATH}/${images[1]}`}
          paddingBottom={"100vh"}
        />
        {/* <div className={styles.cardTwoDescription}>
          <h1 className={styles.headingTwo}>
            <FormattedMessage {...HomeMessages.headingOne} />
          </h1>
          <p className={styles.subHeadingTwo}>
            <FormattedMessage {...HomeMessages.subHeadingOne} />
          </p>
        </div> */}

        <div className={styles.cardOneDescription}>
          <h1 style={{ color: "black" }}>
            <FormattedMessage {...HomeMessages.headingOne} />
          </h1>
          <p style={{ color: "black" }}>
            <FormattedMessage {...HomeMessages.subHeadingOne} />
          </p>
        </div>
      </div>
    );
  };
  renderThirdCard = () => {
    return (
      <div className={styles.card}>
        <Image
          src={`${PUBLIC_ASSETS_PATH}/${images[2]}`}
          paddingBottom={"100vh"}
        />
        {/* <div className={styles.cardThirdDescription}>
          <h1 className={styles.headingThird}>
            <FormattedMessage {...HomeMessages.headingThree} />
          </h1>
          <p className={styles.subHeadingThird}>
            <FormattedMessage {...HomeMessages.subHeadingThree} />
          </p>
        </div> */}
        <div className={styles.cardOneDescription}>
          <h1 style={{ color: "black" }}>
            <FormattedMessage {...HomeMessages.headingOne} />
          </h1>
          <p style={{ color: "black" }}>
            <FormattedMessage {...HomeMessages.subHeadingOne} />
          </p>
        </div>
      </div>
    );
  };
  // renderFourthCard = () => {
  //   return (
  //     <div className={styles.card}>
  //       <Image
  //         src={`${PUBLIC_ASSETS_PATH}/${images[3]}`}
  //         paddingBottom={"100vh"}
  //       />
  //       <div className={styles.cardThirdDescription}>
  //         <h1 className={styles.headingThird}>
  //           <FormattedMessage {...HomeMessages.headingThree} />
  //         </h1>
  //         <p className={styles.subHeadingThird}>
  //           <FormattedMessage {...HomeMessages.subHeadingThree} />
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };

  // renderFifthCard = () => {
  //   return (
  //     <div className={styles.card}>
  //       <Image
  //         src={`${PUBLIC_ASSETS_PATH}/${images[4]}`}
  //         paddingBottom={"100vh"}
  //       />
  //       <div className={styles.cardThirdDescription}>
  //         <h1 className={styles.headingThird}>
  //           <FormattedMessage {...HomeMessages.headingThree} />
  //         </h1>
  //         <p className={styles.subHeadingThird}>
  //           <FormattedMessage {...HomeMessages.subHeadingThree} />
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };
  render() {
    const componentData = [
      this.renderFirstCard(),
      this.renderSecondCard(),
      this.renderThirdCard(),
      // this.renderFourthCard(),
      // this.renderFifthCard(),
    ];
    return (
      <div className={styles.base}>
        <CarouselBanner
          changePosition={(index) =>
            this.changePosition(index, componentData.length)
          }
          goForward={() => this.goForward(componentData.length)}
          goBack={() => this.goBack(componentData.length)}
          position={this.state.position}
          juke={this.state.juke}
          showNav={false}
          isReversSlide={isArabicLanguageUrl()}
        >
          {componentData.map((item, id) => {
            return (
              <div className={styles.bannerWrapper} key={id}>
                <VisibilityChild>{item}</VisibilityChild>
              </div>
            );
          })}
        </CarouselBanner>
        <div
          onClick={() => this.scrollTopBanner()}
          className={styles.scrollToButton}
        >
          <Icon image={`${PUBLIC_ASSETS_PATH}/arrowWhite.svg`} />
        </div>
      </div>
    );
  }
}
export default TopBanner;
