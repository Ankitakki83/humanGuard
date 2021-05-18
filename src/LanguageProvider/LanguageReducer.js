/*
 *
 * LanguageProvider reducer
 *
 */

import {
  CHANGE_LOCALE,
  DEFAULT_LOCALE,
  ARABIC_LANGUAGE,
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE_URL_REG_EX
} from "../Utils/Constants";
import { isArabicLanguageUrl } from "../Utils/UserAgent";

const defaultLanguage =
  typeof window !== "undefined" &&
  window.location &&
  isArabicLanguageUrl() &&
  ARABIC_LANGUAGE;

const initialState = {
  locale:
    defaultLanguage === ARABIC_LANGUAGE ? ARABIC_LANGUAGE : ENGLISH_LANGUAGE
};

const languageProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return Object.assign({}, state, {
        locale: action.locale
      });
    default:
      return state;
  }
};

export default languageProviderReducer;
