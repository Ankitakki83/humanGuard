import thunk from "redux-thunk";
import * as api from "./lib/apiRequest";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import language from "./LanguageProvider/LanguageReducer";

let composeEnhancers = compose;
let preloadedState = {};

if (typeof window !== "undefined") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  preloadedState = window.INITIAL_STATE || {};
  delete window.INITIAL_STATE;
}
function createReducer(asyncReducer) {
  return combineReducers({
    language,

    ...asyncReducer
  });
}
let store = createStore(
  createReducer(),
  preloadedState,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({
        api
      })
    )
  )
);
export function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers = store.asyncReducers ? store.asyncReducers : {};

  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
export default store;
