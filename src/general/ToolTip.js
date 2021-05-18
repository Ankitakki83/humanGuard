import React from "react";
import styles from "./ToolTip.css";
import Icon from "./Icon";
import { PUBLIC_IMAGES_PATH } from "../Utils/Constants";
import withRouter from "react-router-dom/withRouter";
import { TERMS_AND_CONDITION_PATH_WITH_IMPORTDUTIES } from "../Utils/RouteUrl";
class ToolTip extends React.Component {
  preventClick = event => {
    event.stopPropagation();
  };
  onClick() {
    this.props.history.push(TERMS_AND_CONDITION_PATH_WITH_IMPORTDUTIES);
  }
  render() {
    let toolTipPostionClassName = styles.toolTipTextHolderRight;
    if (this.props.left) {
      toolTipPostionClassName = styles.toolTipTextHolderLeft;
    } else if (this.props.center) {
      toolTipPostionClassName = styles.toolTipTextHolderCenter;
    }
    return (
      <div className={styles.base} onClick={this.preventClick}>
        {this.props.children}
        <div className={toolTipPostionClassName}>
          <div>{this.props.label}</div>
          <div className={styles.toolTipSubLabel}>{this.props.subLabel}</div>
          {this.props.showIcon && (
            <span className={styles.iconWrapper} onClick={() => this.onClick()}>
              <Icon image={`${PUBLIC_IMAGES_PATH}/infoWhite.svg`} size={10} />
            </span>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(ToolTip);
