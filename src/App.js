import React from "react";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifyFacebookButton,
  AmplifyGoogleButton,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";

import { Row } from "react-bootstrap";

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (!window.FB) createScript();

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const signIn = () => {
    const fb = window.FB;
    fb.getLoginStatus((response) => {
      if (response.status === "connected") {
        getAWSCredentials(response.authResponse);
      } else {
        fb.login(
          (response) => {
            if (!response || !response.authResponse) {
              return;
            }
            getAWSCredentials(response.authResponse);
          },
          {
            // the authorized scopes
            scope: "public_profile,email",
          }
        );
      }
    });
  };

  const getAWSCredentials = (response) => {
    const { accessToken, expiresIn } = response;
    const date = new Date();
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }

    const fb = window.FB;
    fb.api("/me", { fields: "name,email" }, (response) => {
      const user = {
        name: response.name,
        email: response.email,
      };

      Auth.federatedSignIn(
        "facebook",
        { token: accessToken, expires_at },
        user
      ).then((credentials) => {
        console.log(credentials);
      });
    });
  };

  const createScript = () => {
    // load the sdk
    window.fbAsyncInit = fbAsyncInit;
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onload = initFB;
    document.body.appendChild(script);
  };

  const initFB = () => {
    const fb = window.FB;
    console.log("FB SDK initialized");
  };

  const fbAsyncInit = () => {
    // init the fb sdk client
    const fb = window.FB;
    fb.init({
      appId: "541409930434877",
      cookie: true,
      xfbml: true,
      version: "v2.11",
    });
  };

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div>
        Hello, {user.username} <AmplifySignOut />
      </div>
    </div>
  ) : (
    <>
      <Row className="mb-3">
        <AmplifyAuthenticator>
          <AmplifySignIn headerText="My Custom Sign In Text" slot="sign-in">
            <div slot="federated-buttons">
              <AmplifyGoogleButton
                onClick={() => Auth.federatedSignIn({ provider: "Google" })}
              />
              <AmplifyFacebookButton onClick={signIn} />
              <hr />
            </div>
          </AmplifySignIn>
        </AmplifyAuthenticator>
      </Row>
    </>
  );
};

export default AuthStateApp;
