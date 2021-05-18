import React from "react";
import styles from "./TextArea.css";
import PropTypes from "prop-types";

class TextArea extends React.Component {
  onChange = event => {
    const str = event.target.value;
    const stringWithoutEmojies = str
      .replace(
        /(?:[\u2700\-\u27bf]|(?:\ud83c[\udde6\-\uddff]){2}|[\ud800\-\udbff][\udc00\-\udfff]|[\u0023\-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70\-\udd71]|\ud83c[\udd7e\-\udd7f]|\ud83c\udd8e|\ud83c[\udd91\-\udd9a]|\ud83c[\udde6\-\uddff]|\ud83c[\ude01\-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32\-\ude3a]|\ud83c[\ude50\-\ude51]|\u203c|\u2049|[\u25aa\-\u25ab]|\u25b6|\u25c0|[\u25fb\-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600\-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9\-\u23f3]|[\u23f8\-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190\-\u21ff]|[\uE000\-\uF8FF]|\uD83C[\uDF00\-\uDFFF]|\uD83D[\uDC00\-\uDDFF])/g,
        ""
      )
      .replace(
        /[^A-Za-z0-9\w\.,\?""!@#\$%\^&\*\(\)\-_=\+;:<>\/\\\|\}\{\[\]`~\s\']*/g,
        ""
      );
    if (this.props.onChange) {
      this.props.onChange(stringWithoutEmojies);
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.textAreaContent}>
          <textarea
            className={styles.textarea}
            rows={this.props.textAreaRow}
            placeholder={this.props.placeholder}
            style={{
              fontFamily: this.props.fontFamily,
              color: this.props.color,
              background: this.props.background,
              padding: this.props.padding,
              boxSizing: "border-box",
              width: this.props.width,
              padding: this.props.padding,
              fontSize: this.props.fontSize,
              border: this.props.border,
              borderRadius: this.props.borderRadius,
              height: this.props.height
            }}
            onChange={event => this.onChange(event)}
            value={this.props.value}
            maxLength={this.props.maxLength}
          />
        </div>
      </div>
    );
  }
}
TextArea.propTypes = {
  fontFamily: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  padding: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.height
};

export default TextArea;
