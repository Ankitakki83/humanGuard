import React from "react";
import styles from "./AllInclusiveTooltip.css";
import Icon from "./Icon";
import {
  PUBLIC_IMAGES_PATH,
  US_COUNTRY_CODE,
  KW_COUNTRY_CODE,
  OM_COUNTRY_CODE,
  SA_COUNTRY_CODE,
  BH_COUNTRY_CODE,
  UAE_COUNTRY_CODE,
  DEFAULT_COUNTRY_CODE
} from "../Utils/Constants";
import { FormattedMessage } from "react-intl";
import ToolTip from "./ToolTip";
import { COUNTRY_AND_CURRENCY_LOCAL_STORAGE } from "../Utils/LocalStorage.constants";
import HomeMessage from "../Home/Messages/HomeMessage";

export default class AllInclusiveTooltip extends React.Component {
  render() {
    const countryObj =
      localStorage.getItem &&
      localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE);
    let countryCode =
      countryObj && JSON.parse(countryObj).country_code
        ? JSON.parse(countryObj).country_code
        : DEFAULT_COUNTRY_CODE;
    let toolTipLebel = "";
    let toolTipSubLebel = "";
    let showIcon = false;
    if (countryCode === UAE_COUNTRY_CODE) {
      toolTipLebel = <FormattedMessage {...HomeMessage.vatContent} />;
      showIcon = false;
    } else if (
      countryCode === SA_COUNTRY_CODE ||
      countryCode === BH_COUNTRY_CODE
    ) {
      toolTipLebel = (
        <FormattedMessage {...HomeMessage.vatInclusiveCustonAndDutiesContent} />
      );
      showIcon = false;
    } else if (
      countryCode === KW_COUNTRY_CODE ||
      countryCode === OM_COUNTRY_CODE
    ) {
      toolTipLebel = (
        <FormattedMessage {...HomeMessage.custonAndDutiesInclusiveContent} />
      );
      showIcon = false;
    } else if (countryCode === US_COUNTRY_CODE) {
      if (this.props.price < 800) {
        toolTipLebel = (
          <FormattedMessage {...HomeMessage.sppFreeShippingContent} />
        );
        toolTipSubLebel = (
          <FormattedMessage {...HomeMessage.freeDutiesContent} />
        );
        showIcon = false;
      } else {
        toolTipLebel = (
          <FormattedMessage {...HomeMessage.sppFreeShippingContent} />
        );
        toolTipSubLebel = (
          <FormattedMessage {...HomeMessage.customAndDutiesContent} />
        );
        showIcon = true;
      }
    } else {
      toolTipLebel = (
        <FormattedMessage {...HomeMessage.sppFreeShippingContent} />
      );
      toolTipSubLebel = (
        <FormattedMessage {...HomeMessage.customAndDutiesContent} />
      );
      showIcon = true;
    }
    return (
      <div className={styles.base}>
        <ToolTip
          label={toolTipLebel}
          subLabel={toolTipSubLebel}
          left={this.props.left}
          center={this.props.center}
          showIcon={showIcon}
        >
          <div className={styles.iconWrapper}>
            <Icon image={`${PUBLIC_IMAGES_PATH}/info.svg`} size={12} />
          </div>
        </ToolTip>
      </div>
    );
  }
}
