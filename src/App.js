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
import { SignInWithFacebook } from "./loginSM/loginWithFacebook.js";

import { Row } from "react-bootstrap";

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const logginFacebook = new SignInWithFacebook();
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (!window.FB) logginFacebook.createScript();

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

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
              <AmplifyFacebookButton
                onClick={() => logginFacebook.signInFacebook()}
              />
              <hr />
            </div>
          </AmplifySignIn>
        </AmplifyAuthenticator>
      </Row>
    </>
  );
};

export default AuthStateApp;
