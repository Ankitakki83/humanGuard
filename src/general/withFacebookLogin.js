import React from "react";
import cloneDeep from "lodash.clonedeep";
const SUCCESS = "success";
const ERROR = "error";
const FACEBOOK_SCOPE = "email,user_likes";
const LOCALE = "en_US";
const FACEBOOK_FIELDS =
  "first_name.as(firstName),last_name.as(lastName), email";
const MY_PROFILE = "me";
const FACEBOOK_VERSION = process.env.FACEBOOK_VERSION
  ? process.env.FACEBOOK_VERSION
  : "v2.11";
const FACEBOOK_SDK = process.env.FACEBOOK_SDK
  ? process.env.FACEBOOK_SDK
  : "https://connect.facebook.net/en_US/sdk.js";
const SCRIPT = "script";
const FACEBOOK_JSDK = process.env.FACEBOOK_JSDK
  ? process.env.FACEBOOK_JSDK
  : "facebook-jssdk";
const CANCELED_BY_USER_MESSAGE =
  "User cancelled login or did not fully authorize";

const withFacebookLogin = (Component, fbObject) => {
  class WithFacebookLoginComponent extends React.Component {
    componentDidMount() {
      const appId = process.env.FACEBOOK_APP_ID
        ? process.env.FACEBOOK_APP_ID
        : (fbObject || {}).appId;
      if (!appId) {
        console.error(
          "No App Id Provided,facebook App id should be pass in <appId> key."
        );
      }
      window.fbAsyncInit = () => {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: FACEBOOK_VERSION
        });
        window.FB.AppEvents.logPageView();
      };
      ((d, s, id) => {
        var js,
          fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = FACEBOOK_SDK;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, SCRIPT, FACEBOOK_JSDK);
    }
    facebookLogin = async () => {
      try {
        const fields = (fbObject || {}).fields
          ? (fbObject || {}).fields
          : FACEBOOK_FIELDS;

        const authResponse = await new Promise((resolve, reject) => {
          window.FB.login(
            resp => {
              if (resp.authResponse) {
                resolve(resp);
              } else {
                reject(CANCELED_BY_USER_MESSAGE);
              }
            },
            { scope: FACEBOOK_SCOPE }
          );
        });
        const graphResponse = await new Promise((resolve, reject) => {
          window.FB.api(
            `/${MY_PROFILE}`,
            { locale: LOCALE, fields: fields },
            response => {
              resolve(response);
            }
          );
        });
        return {
          status: SUCCESS,
          ...authResponse.authResponse,
          ...graphResponse
        };
      } catch (e) {
        return { status: ERROR, message: e };
      }
    };

    render() {
      const clickHandlerFunction = this.props.onClick;
      const handler = async ({ ...argument }) => {
        if (clickHandlerFunction) {
          clickHandlerFunction(argument);
        }
        let faceBookResponse = await this.facebookLogin();

        if (faceBookResponse.status === SUCCESS) {
          if (this.props.onSuccess) {
            this.props.onSuccess(faceBookResponse);
          }
        } else {
          if (this.props.onCancel) {
            this.props.onCancel(faceBookResponse);
          }
        }
      };
      let newProps = cloneDeep(this.props);
      newProps.onClick = handler;
      return <Component {...newProps} />;
    }
  }
  return WithFacebookLoginComponent;
};
export default withFacebookLogin;
