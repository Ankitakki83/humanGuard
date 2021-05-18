import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeLocale } from "./LanguageAction";
import { FormattedMessage } from "react-intl";
import {
  ARABIC_LANGUAGE_WITH_COUNTRY,
  ENGLISH_LANGUAGE_WITH_COUNTRY,
  ARABIC_REG_EX,
  ENGLISH_REG_EX
} from "../Utils/Constants";
import { isArabicLanguageUrl } from "../Utils/UserAgent";
import { getBaseUrl } from "../Utils/urlUtils";
import ChangeLanguageSelectBox from "../MyAccount/Components/ChangeLanguageSelectBox";

class Language extends React.Component {
  changeLanguage = () => {
    let baseURL = getBaseUrl();
    if (isArabicLanguageUrl(this.props.location.pathname)) {
      if (baseURL.match(ARABIC_LANGUAGE_WITH_COUNTRY)) {
        baseURL = baseURL.replace(ARABIC_REG_EX, "en");
      } else {
        baseURL = baseURL.replace(ARABIC_REG_EX, "");
      }
    } else {
      if (
        baseURL.match(ENGLISH_LANGUAGE_WITH_COUNTRY) ||
        baseURL.match(ENGLISH_REG_EX)
      ) {
        baseURL = baseURL.replace(ENGLISH_REG_EX, "ar");
      } else {
        baseURL = `${baseURL}/ar`;
      }
    }

    let finalURL = `${baseURL}${this.props.location.pathname}${
      this.props.location.search
    }`;

    finalURL = finalURL.replace("///", "/").replace("//", "/");

    window.location.href = window.location.href = `${
      window.location.origin
    }${finalURL}`;
  };
  render() {
    return (
      <div>
        {this.props.languageSelect ? (
          <div>
            <ChangeLanguageSelectBox
              onSubmit={() => this.changeLanguage()}
              showButton={true}
            />
          </div>
        ) : (
          <div onClick={() => this.changeLanguage()}>
            <FormattedMessage
              id="home.component.navbar.language.option"
              defaultMessage={"English"}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    language: state.language.locale
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: language => {
      dispatch(changeLocale(language));
    }
  };
};
const LanguageChangeComponent = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Language)
);
export default LanguageChangeComponent;
