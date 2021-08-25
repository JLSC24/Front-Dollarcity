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

import { Button, Col, Row } from "react-bootstrap";

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
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
                onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
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
