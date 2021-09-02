import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Home from "./home.js";
import { Amplify, Auth } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";

import { Row, Col, Button } from "react-bootstrap";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
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
      <Home></Home>
      {/* <div>
        Hello, {user.username} <AmplifySignOut />
      </div> */}
    </div>
  ) : (
    <>
      <Row className="mb-3">
        <AmplifyAuthenticator>
          <AmplifySignIn headerText="Dollarcity" slot="sign-in">
            <div slot="federated-buttons">
              <Row className="mb-1">
                <Col>
                  <Button
                    className="botonFacebook"
                    onClick={() =>
                      Auth.federatedSignIn({ provider: "Facebook" })
                    }
                  >
                    <FaFacebook size="2em" /> Iniciar con Facebook
                  </Button>
                </Col>
              </Row>
              <Row className="mb-1">
                <Col>
                  <Button
                    className="botonGoogle"
                    onClick={() => Auth.federatedSignIn({ provider: "Google" })}
                  >
                    <FcGoogle size="2em" /> Iniciar con Google
                  </Button>
                </Col>
              </Row>

              <hr />
            </div>
          </AmplifySignIn>
        </AmplifyAuthenticator>
        {/* <AmplifyAuthenticator federated={federated}></AmplifyAuthenticator> */}
      </Row>
    </>
  );
};

export default AuthStateApp;
