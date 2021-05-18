import React from "react";
import styles from "./css/BlogComponent.css";
import Image from "../../general/Image";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";
export default class BlogComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0
    };
  }
  renderBlog = (blog, id) => {
    return (
      <div className={styles.blogWrapper} key={id}>
        <div className={styles.blog}>"{blog.desc}"</div>
        <div className={styles.name}>- {blog.name}</div>
      </div>
    );
  };
  render() {
    const blogs = [
      {
        desc:
          "Hi there i want to say that littra is a new way of technology for smart.",
        name: "Manoj Kumar"
      },
      {
        desc:
          "Hi there i want to say that littra is a new way of technology for smart.",
        name: "Rekha Kumar"
      },
      {
        desc:
          "Hi there i want to say that littra is a new way of technology for smart.",
        name: "Anand"
      }
    ];
    return (
      <div className={styles.base}>
        <div className={styles.background}>
          <Image src={`${PUBLIC_ASSETS_PATH}/blog.jpg`} paddingBottom="100vh" />
        </div>
        <div className={styles.information}>
          <div className={styles.blogHeading}>
            <h2 className={styles.heading}>
              <FormattedMessage {...HomeMessages.blogHeading} />
            </h2>
          </div>
          <div className={styles.carouselWrapper}>
            {blogs.map((blog, id) => {
              if (this.state.current !== id) {
                return <div />;
              }
              return this.renderBlog(blog, id);
            })}
          </div>
          <div className={styles.navigationWrapper}>
            {blogs.map((blog, id) => {
              return (
                <div
                  className={`${styles.navigationBullet} ${this.state
                    .current === id && styles.selected}`}
                  onClick={() => this.setState({ current: id })}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
