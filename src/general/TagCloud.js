import React from "react";
import styles from "./TagCloud.css";
import Tag from "./Tag";
import PropTypes from "prop-types";

class TagCloud extends React.Component {
  onClick = id => {
    const tagList = this.props.tagList;
    const deleteIndex = tagList.findIndex(item => {
      return item.id === id;
    });
    tagList.splice(deleteIndex, 1);

    if (this.props.onChange) {
      this.props.onChange(tagList);
    }
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.tagItems}>
          {this.props.tagList &&
            this.props.tagList.map((item, id) => {
              return (
                <Tag
                  label={item.label}
                  key={id}
                  onClick={() => this.onClick(item.id)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
export default TagCloud;
TagCloud.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};
