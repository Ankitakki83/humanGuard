import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./BreadCrumb.css";
import cloneDeep from "lodash.clonedeep";
class BreadCrumb extends Component {
  gotToUrl(url) {
    if (this.props.history) {
      this.props.history.push(url);
    }
  }

  render() {
    const location = cloneDeep(this.props.location);
    let breadCrumbs;
    if (this.props.breadCrumbs) {
      breadCrumbs = this.props.breadCrumbs;
    } else {
      breadCrumbs = location.pathname.split("/").map((item, id) => {
        return {
          label: item ? item.replace(/-/g, " ") : "Home",
          url: location.pathname
            .split("/")
            .splice(0, id + 1)
            .join("/")
        };
      });
    }

    return (
      <div className={styles.base}>
        <ol
          className={styles.titleWrapper}
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadCrumbs.map((item, id) => {
            return (
              <li
                className={styles.title}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                key={id}
              >
                <a
                  itemType="https://schema.org/Thing"
                  itemProp="item"
                  href={item.url}
                  aria-label={item.label}
                />
                <span itemProp="name" onClick={() => this.gotToUrl(item.url)}>
                  {item.label}
                </span>
                <meta itemProp="position" content={id} />
                {breadCrumbs[breadCrumbs.length - 1].label !== item.label && (
                  <div className={styles.strip}> /</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default withRouter(BreadCrumb);
