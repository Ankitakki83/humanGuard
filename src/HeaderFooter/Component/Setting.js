import React from "react";
import styles from "./css/Setting.css";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../../Home/Messages/HomeMessages";
import {
  DARK_THEME,
  LIGHT_THEME,
  THEME_LOCAL_STORAGE
} from "../../Utils/Constants";
export default class Setting extends React.Component {
  changeTheme = theme => {
    localStorage.setItem(THEME_LOCAL_STORAGE, theme);
    window.location.reload();
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.theme}>
          <div
            className={styles.dark}
            onClick={() => this.changeTheme(DARK_THEME)}
          >
            <p className={styles.fontColor}>
              <FormattedMessage {...HomeMessages.dark} />
            </p>
          </div>
          <div
            className={styles.light}
            onClick={() => this.changeTheme(LIGHT_THEME)}
          >
            <p className={styles.fontColor}>
              <FormattedMessage {...HomeMessages.light} />
            </p>
          </div>
        </div>
        <hr className={styles.divider} />
        {/* <div className={styles.language}>
          <p className={styles.language}>Lnaguage</p>
        </div> */}
      </div>
    );
  }
}
