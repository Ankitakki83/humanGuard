import React from "react";
import styles from "./css/SecondTopBanner.css";
import Image from "../../general/Image";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  toggleShowMore = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  render() {
    return (
      <div className={styles.base} id="aboutus">
        <div className={styles.left}>
          <div className={styles.featureWrapper}>
            <div className={styles.cardOneDescription}>
              <h1>
                <FormattedMessage {...HomeMessages.aboutHeading} />
              </h1>
            </div>
            <hr className={styles.border} />
            <div className={styles.imageWrapperMobile}>
              <Image
                src={`${PUBLIC_ASSETS_PATH}/images1.png`}
                paddingBottom="80%"
              />
            </div>
            <ul className={styles.pad}>
              <p className={styles.aboutText}>
                <FormattedMessage {...HomeMessages.aboutTextOne} />
              </p>
              <button className={styles.showMore} onClick={this.toggleShowMore}>
                {this.state.showMore ? "" : "Show more..."}
              </button>
              {this.state.showMore && (
                <div className={styles.moreContent}>
                  <p className={styles.aboutText}>
                    <FormattedMessage {...HomeMessages.aboutTextTwo} />
                  </p>
                  <p className={styles.aboutText}>
                    <FormattedMessage {...HomeMessages.aboutTextThree} />
                  </p>
                  <button
                    className={styles.showMore}
                    onClick={this.toggleShowMore}
                  >
                    {!this.state.showMore ? "" : "Show Less..."}
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image
              src={`${PUBLIC_ASSETS_PATH}/images1.png`}
              paddingBottom="370px"
            />
          </div>
        </div>
      </div>
    );
  }
}
