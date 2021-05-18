import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home/Component/Home";
import Header from "./HeaderFooter/Component/Header";
import { THEME_LOCAL_STORAGE, DARK_THEME } from "./Utils/Constants";
import isMobile from "./Utils/UserAgent";
import Image from "./general/Image";
import * as styles from "./App.css";
import Icon from "./general/Icon";

export default class App extends React.Component {
  componentDidMount() {
    const theme =
      localStorage.getItem && localStorage.getItem(THEME_LOCAL_STORAGE);
    if (theme === DARK_THEME) {
      document.querySelector("html").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("html").removeAttribute("data-theme");
    }
  }
  render() {
    // if (isMobile()) {
    //   return (
    //     <div className={styles.mobileBase}>
    //       <Icon image="./assets/images/icon_512.png" size={150} />
    //       <h1 className={styles.text}>Sorry, We dont support mobile view.</h1>
    //       <h3 className={styles.text}>Please visit site from desktop</h3>
    //     </div>
    //   );
    // }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="*" component={Home} />
        </Switch>
      </div>
    );
  }
}
