import React from "react";
import styles from "./css/SecondTopBanner.css";
import Image from "../../general/Image";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";
export default class SecondTopBanner extends React.Component {
  render() {
    return (
      <div className={styles.base} id="features">
        <div className={styles.left}>
          <div className={styles.featureWrapper}>
            <h1 className={styles.darkColor}>
              <FormattedMessage {...HomeMessages.featureHeading} />
            </h1>
            <h3 className={styles.darkColor}>
              <FormattedMessage {...HomeMessages.featureSubHeading} />
            </h3>
            <hr className={styles.border} />
            <ul>
              <li className={styles.feature1}>
                <FormattedMessage {...HomeMessages.featureOne} />
              </li>
              <li className={styles.feature2}>
                <FormattedMessage {...HomeMessages.featureTwo} />
              </li>
              <li className={styles.feature3}>
                <FormattedMessage {...HomeMessages.featureThird} />
              </li>
              <li className={styles.feature4}>
                <FormattedMessage {...HomeMessages.featureFour} />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image
              src={`${PUBLIC_ASSETS_PATH}/image1.png`}
              paddingBottom="370px"
            />
          </div>
        </div>
      </div>
    );
  }
}
