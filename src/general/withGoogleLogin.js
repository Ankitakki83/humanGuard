import React from "react";
const SUCCESS = "success";
const ERROR = "error";
const SCOPE = "https://www.googleapis.com/auth/plus.login email";
const GOOGLE_PLATFORM_URL = "//apis.google.com/js/platform.js";
const withGoogleLogin = (Component, googleObject) => {
  class WithGoogleLoginComponent extends React.Component {
    componentDidMount() {
      const scope = SCOPE;
      const clientId = process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : (googleObject || {}).clientId;
      if (!clientId) {
        console.error(
          "Google client id is not provided, Please pass google client id in <clientId> key"
        );
      }
      return new Promise((resolve, reject) => {
        const firstJS = document.getElementsByTagName("script")[0];
        const js = document.createElement("script");

        js.src = GOOGLE_PLATFORM_URL;
        js.id = "gapi-client";

        js.onload = () => {
          window.gapi.load("auth2", () => {
            if (!window.gapi.auth2.getAuthInstance()) {
              window.gapi.auth2
                .init({
                  client_id: clientId,
                  fetch_basic_profile: true,
                  ux_mode: "popup",
                  scope: scope
                    ? (Array.isArray(scope) && scope.join(" ")) || scope
                    : null
                })
                .then(
                  () =>
                    resolve({
                      status: "success"
                    }),
                  err => {
                    resolve({
                      provider: "google",
                      type: "load",
                      error: "Failed to load SDK",
                      status: "error",
                      err
                    });
                  }
                );
            } else {
              resolve({
                status: "success"
              });
            }
          });
        };

        if (!firstJS) {
          document.appendChild(js);
        } else {
          firstJS.parentNode.appendChild(js);
        }
      });
    }
    googleLogin = async () => {
      try {
        const googleResponse = await window.gapi.auth2
          .getAuthInstance()
          .signIn();

        if (googleResponse.code > 400) {
          throw new Error(googleResponse.message);
        }

        const basicProfile = googleResponse.getBasicProfile();
        const profileImage = basicProfile.getImageUrl();
        const email = basicProfile.getEmail();
        const name = basicProfile.getName();
        const id = basicProfile.getId();
        let firstName, lastName;
        if (name) {
          firstName = name.split(" ")[0];
          lastName = name.split(" ")[1];
        }
        const accessToken = googleResponse.getAuthResponse().access_token;
        const id_token = googleResponse.getAuthResponse().id_token;

        return {
          status: SUCCESS,
          email,
          id,
          accessToken,
          profileImage,
          firstName,
          lastName,
          id_token
        };
      } catch (e) {
        return {
          status: ERROR,
          message: e.message ? e.message : "Something went wrong"
        };
      }
    };
    render() {
      const clickHandlerFunction = this.props.onClick;
      const handler = async ({ ...argument }) => {
        if (clickHandlerFunction) {
          clickHandlerFunction(argument);
        }
        const googleLoginResponse = await this.googleLogin();

        if (googleLoginResponse.status === SUCCESS) {
          if (this.props.onSuccess) {
            this.props.onSuccess(googleLoginResponse);
          }
        } else {
          if (this.props.onCancel) {
            this.props.onCancel(googleLoginResponse);
          }
        }
      };
      let newProps = { ...this.props };
      newProps["onClick"] = handler;
      return <Component {...newProps} />;
    }
  }
  return WithGoogleLoginComponent;
};
export default withGoogleLogin;
