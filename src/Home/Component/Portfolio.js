import React from "react";
import styles from "./css/Portfolio.css";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";
import Icon from "../../general/Icon";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
class Portfolio extends React.Component {
  renderPortfolioCard = (item) => {
    return (
      <div className={styles.box}>
        <div className={styles.wallpaper}>
          <Icon image={`${PUBLIC_ASSETS_PATH}/${item.icon}`} size={200} />
        </div>
        <div className={styles.infoCard}>
          <h1 className={styles.header}>
            <a href={item.link} target="blank">
              {item.header}
            </a>
          </h1>
          <p className={styles.desc}>{item.desc}</p>
        </div>
      </div>
      // <div className={styles.wallpaperMobile}>
      //   <Icon image={`${PUBLIC_ASSETS_PATH}/${item.icon}`} size={200} />
      // </div>
      // <div className={styles.infoCard}>
      //   <h1 className={styles.header}>
      //     <a href={item.link} target="blank">
      //       {item.header}
      //     </a>
      //   </h1>
      //   <p className={styles.desc}>{item.desc}</p>
      // </div>
    );
  };
  render() {
    const littraChatBot = {
      icon: "disherve.png",
      header: <FormattedMessage {...HomeMessages.littraChatBot} />,
      desc: <FormattedMessage {...HomeMessages.littraChatBotDesc} />,
      link: "https://apps.apple.com/us/app/disherve/id1496988145",
    };
    const littraPersonalization = {
      icon: "video-conference.svg",
      header: <FormattedMessage {...HomeMessages.littraPersonalization} />,
      desc: <FormattedMessage {...HomeMessages.littraPersonalizationDesc} />,
      link: "https://app.littra.in",
    };
    return (
      <div className={styles.base} id="portfolio">
        <div className={styles.topSection}>
          <h1 className={styles.dark}>
            <FormattedMessage {...HomeMessages.portfolioHeading} />
          </h1>
        </div>
        <hr className={styles.divider} />
        <div className={styles.portfolioWrapper}>
          <div className={styles.portfolioTwo}>
            {this.renderPortfolioCard(littraPersonalization)}
          </div>
          <div className={styles.portfolioOne}>
            {this.renderPortfolioCard(littraChatBot)}
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
