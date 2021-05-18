/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from "../Utils/Constants";

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  };
}
