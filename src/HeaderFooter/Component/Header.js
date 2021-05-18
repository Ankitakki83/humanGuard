import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./css/Header.css";
import Icon from "../../general/Icon";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import Setting from "./Setting";
import Image from "../../general/Image";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyHeader: false,
      showSetting: false,
    };
  }
  handleScroll = () => {
    if (this.state.stickyHeader) {
      if (document.documentElement.scrollTop < 20) {
        this.setState({ stickyHeader: false });
      }
    } else {
      if (document.documentElement.scrollTop > 20) {
        this.setState({ stickyHeader: true });
      }
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll");
  }
  renderLink = (title, url) => {
    return (
      <a
        className={styles.link}
        href={`${url}`}
        onClick={() =>
          document.getElementById(url).scrollIntoView({ behavior: "smooth" })
        }
      >
        {title}
      </a>
    );
  };
  onClickSetting = () => {
    this.setState((prevState) => ({ showSetting: !prevState.showSetting }));
  };
  render() {
    return (
      <div
        className={[
          styles.base,
          this.state.stickyHeader && styles.fixedHeader,
        ].join(" ")}
      >
        <div className={styles.tittleWrapper}>
          <p
            className={`${styles.title} ${this.state.stickyHeader &&
              styles.titleSmall}`}
          >
            HUMAN GUARD
          </p>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.settingIconMobile}>
            <Icon image={`${PUBLIC_ASSETS_PATH}/square.svg`} size={30} />
          </div>
          <div
            className={`${styles.links} ${this.state.stickyHeader &&
              styles.linksSmall}`}
          >
            {this.renderLink("Home", "#")}
            {this.renderLink("About Us", "#aboutus")}
            {/* {this.renderLink("Features", "#features")}
            {this.renderLink("Pages", "#pages")}
            {this.renderLink("Portfolio", "#portfolio")} */}
            {this.renderLink("Why Us?", "#whyus")}
            {this.renderLink("Contact Us", "#contactus")}
          </div>

          <div
            className={styles.searchBox}
            onClick={() => this.onClickSetting()}
          >
            <div className={styles.settingIcon}>
              <Icon
                image={`${PUBLIC_ASSETS_PATH}/setting-green.svg`}
                size={20}
              />
            </div>{" "}
            <div className={styles.dropDown}>
              {this.state.showSetting && <Setting />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
