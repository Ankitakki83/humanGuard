import React from "react";
import throttle from "lodash.throttle";
import LoadMoreLoader from "./LoadMoreLoader";
const SCROLL_CHECK_INTERVAL = 200;
const OFFSET_BOTTOM = 800;
import styles from "./Pagination.css";
import isMobile from "../Utils/UserAgent";
import DesktopOnly from "./DesktopOnly";
import GeneralLoader from "./GeneralLoader";
import MobileOnly from "./MobileOnly";
export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1
    };
  }
  handleScroll = () => {
    return throttle(() => {
      if (
        this.props.total &&
        this.props.currentCount &&
        this.props.currentCount < this.props.total &&
        !this.props.loading
      ) {
        const windowHeight =
          "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;

        if (
          windowBottom >= docHeight - OFFSET_BOTTOM &&
          window.pageYOffset > 0
        ) {
          this.onLazyLoad();
        }
      }
    }, SCROLL_CHECK_INTERVAL);
  };
  componentWillUnmount() {
    if (isMobile()) {
      window.removeEventListener("scroll", this.throttledScroll);
    }
  }
  componentDidMount() {
    this.throttledScroll = this.handleScroll();
    if (isMobile()) {
      window.addEventListener("scroll", this.throttledScroll);
    }
  }

  onLazyLoad = pageIndex => {
    const nextPage = parseInt(
      this.props.currentCount / this.props.countPerPage
    );
    if (this.props.onLoad) {
      this.props.onLoad(nextPage);
    }
  };
  numberPagination = () => {
    let numberArray = [];
    const totalNumbers = Math.ceil(this.props.total / this.props.countPerPage);
    for (let i = 1; i <= totalNumbers; i++) {
      numberArray.push(i);
    }
    return numberArray.map((item, id) => {
      return (
        <div
          className={
            this.state.selectedIndex == item
              ? styles.holderSelected
              : styles.holder
          }
          key={id}
          onClick={() => {
            this.handlePagination(item);
          }}
        >
          {item}
        </div>
      );
    });
  };
  handlePagination = pageIndex => {
    this.setState({
      selectedIndex: pageIndex
    });
    if (!isMobile()) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    if (this.props.onLoad) {
      this.props.onLoad(pageIndex);
    }
  };
  render() {
    const totalNumbers = Math.ceil(this.props.total / this.props.countPerPage);
    return (
      <div>
        <div className={styles.contentWrapper}>
          <div>{this.props.children}</div>
          <DesktopOnly>
            {this.props.loading && (
              <div className={styles.desktopLoader}>
                <GeneralLoader />
              </div>
            )}
          </DesktopOnly>
          <MobileOnly>{this.props.loading && <LoadMoreLoader />}</MobileOnly>
        </div>

        <DesktopOnly>
          {totalNumbers > 1 && (
            <div className={styles.numbersHolder}>
              {this.numberPagination()}
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
Pagination.defaultProps = {
  countPerPage: 20
};
