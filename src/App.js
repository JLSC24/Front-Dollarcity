import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Home from "./home.js";
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
  const federated = {
    amazonClientId: "5rcnbbr5il30uo9em4u3lolaks", // Enter your amazonClientId here
  };
  React.useEffect(() => {
    /* if (!window.FB) createScript();

    const ga =
      window.gapi && window.gapi.auth2
        ? window.gapi.auth2.getAuthInstance()
        : null;

    if (!ga) createScriptGoogle();

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    }); */
  }, []);

  /* const signInGoogle = () => {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn().then(
      (googleUser) => {
        getAWSCredentialsGoogle(googleUser);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAWSCredentialsGoogle = async (googleUser) => {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName(),
    };

    const credentials = await Auth.federatedSignIn(
      "google",
      { token: id_token, expires_at },
      user
    );
    console.log("credentials", credentials);
  };

  const createScriptGoogle = () => {
    // load the Google SDK
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.onload = initGapiGoogle;
    document.body.appendChild(script);
  };

  const initGapiGoogle = () => {
    // init the Google SDK client
    const g = window.gapi;
    g.load("auth2", function () {
      g.auth2.init({
        client_id:
          "822255356075-bsbp76ucrnbslklj8rh69cbhr9phvh4m.apps.googleusercontent.com",
        // authorized scopes
        scope: "profile email openid",
      });
    });
  };

  const signIn = () => {
    const fb = window.FB;
    fb.getLoginStatus((response) => {
      console.log(response);
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
    console.log(response);
    const date = new Date();
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }

    const fb = window.FB;
    fb.api("/me", { fields: "name,email" }, (response) => {
      console.log(response);
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
  }; */

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <Home></Home>
      {/* <div>
        Hello, {user.username} <AmplifySignOut />
      </div> */}
    </div>
  ) : (
    <>
      <Row className="mb-3">
        {/* <AmplifyAuthenticator>
          <AmplifySignIn headerText="Dollarcity" slot="sign-in">
            <div slot="federated-buttons">
              <AmplifyGoogleButton onClick={signInGoogle} />
              <AmplifyFacebookButton onClick={signIn} />
              <hr />
            </div>
          </AmplifySignIn>
        </AmplifyAuthenticator> */}
        <AmplifyAuthenticator federated={federated}></AmplifyAuthenticator>
      </Row>
    </>
  );
};

export default AuthStateApp;
