/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */
import React from "react";
import PropTypes from "prop-types";
import en from "react-intl/locale-data/en.js";
import ar from "react-intl/locale-data/ar.js";
import { connect } from "react-redux";
import { IntlProvider, addLocaleData } from "react-intl";
// import messagesAr from "./Translations/ar.json";
// import messagesEn from "./Translations/en.json";
import { isArabicLanguageUrl } from "../Utils/UserAgent.js";
import { ARABIC_LANGUAGE, ENGLISH_LANGUAGE } from "../Utils/Constants.js";
addLocaleData([...ar, ...en]);
const messages = {
  // ar: messagesAr,
  // en: messagesEn
};

class LanguageProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      localLanguages: [],
      messages: messages,
      locale: isArabicLanguageUrl() ? ARABIC_LANGUAGE : ENGLISH_LANGUAGE
    };
  }
  loadInitialData = async () => {
    if (isArabicLanguageUrl()) {
      const messagesAr = await import(/* webpackChunkName: "i18n-ar" */ "./Translations/ar.json");

      this.setState({
        messages: { ar: messagesAr }
      });
    } else {
      const messagesEn = await import(/* webpackChunkName: "i18n-en" */ "./Translations/en.json");

      this.setState({
        messages: { en: messagesEn }
      });
    }
  };
  componentDidMount() {
    this.loadInitialData();
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    if (!this.state.messages[this.state.locale]) {
      return <div />;
    }

    return (
      <IntlProvider
        locale={this.props.locale}
        messages={this.state.messages[this.state.locale]}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}
LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};
const mapStateToProps = state => {
  return {
    locale: state.language.locale
  };
};
export default connect(mapStateToProps)(LanguageProvider);
