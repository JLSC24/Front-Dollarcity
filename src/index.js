import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthStateApp from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Home from "./home";
const AppWithAuth = withAuthenticator(Home);

const federated = {
  googleClientId:
    "822255356075-bsbp76ucrnbslklj8rh69cbhr9phvh4m.apps.googleusercontent.com", // Enter your googleClientId here
  facebookAppId: "541409930434877", // Enter your facebookAppId here
};

Amplify.configure(config);

/* ReactDOM.render(
  <React.StrictMode>
    <AuthStateApp />
  </React.StrictMode>,
  document.getElementById("root")
); */

ReactDOM.render(
  <AppWithAuth federated={federated} />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
