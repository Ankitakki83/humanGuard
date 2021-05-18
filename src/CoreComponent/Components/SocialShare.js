import React from "react";
import Icon from "../../general/Icon";
import { PUBLIC_IMAGES_PATH } from "../../Utils/Constants";
import { SOCIAL_SHARE_MODAL } from "../../Modals/Actions/ModalAction";
import isMobile from "../../Utils/UserAgent";
import * as styles from "./css/SocialShare.css";
import SocialShareModalContainer from "../../Modals/Containers/SocialShareModalContainer";
export default class SocialShare extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowModal: false
    };
  }
  onClick = () => {
    if (isMobile()) {
      if (window.navigator.share) {
        window.navigator.share({
          title: this.props.sharedText,
          text: this.props.sharedText
        });
      } else {
        this.props.showModal(SOCIAL_SHARE_MODAL);
      }
    } else {
      this.setState({ isShowModal: true });
    }
  };
  hideToolTip = e => {
    e.stopPropagation();
    this.setState({ isShowModal: false });
  };
  render() {
    return (
      <div onClick={this.onClick} className={styles.base}>
        <Icon image={`${PUBLIC_IMAGES_PATH}/Share.svg`} size={20} />
        {this.state.isShowModal && (
          <div className={styles.overLay} onClick={e => this.hideToolTip(e)} />
        )}
        {this.state.isShowModal && (
          <div className={styles.toolTip}>
            <SocialShareModalContainer />
          </div>
        )}
      </div>
    );
  }
}
