import React from "react";
import { COUNTRY_AND_CURRENCY_LOCAL_STORAGE } from "../Utils/LocalStorage.constants";
import { DEFAULT_CURRENCY_SYMBOL } from "../Utils/Constants";

export default class ShowPrice extends React.Component {
  addLeadingZeros(value) {
    value = String(value).split(".");
    value[1] = value[1] ? value[1] : "";
    while (value[1].length < 2) {
      value[1] = value[1] + "0";
    }
    return value.join(".");
  }
  formatNumber(num) {
    if (!num) {
      return 0;
    }
    return this.addLeadingZeros(
      num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }
  render() {
    const countryObj =
      localStorage.getItem &&
      localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE) &&
      JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE));
    let currencyObj;
    if (countryObj) {
      currencyObj =
        this.props.currenciesList &&
        this.props.currenciesList.currencies.find(items => {
          return items.currency == countryObj.currency;
        });
    }
    const finalPrice =
      Math.round(
        (currencyObj && currencyObj.rate
          ? currencyObj.rate * this.props.price
          : this.props.price) * 100
      ) / 100;

    if (countryObj) {
      return countryObj.currency_symbol == "$" // need to change after demo . we don't want to show price symbol in demo
        ? `${countryObj.currency_symbol}${this.formatNumber(finalPrice)}`
        : `${this.formatNumber(finalPrice)} ${countryObj.currency}`;
    } else {
      return `${DEFAULT_CURRENCY_SYMBOL}${this.formatNumber(finalPrice)}`;
    }
  }
}
