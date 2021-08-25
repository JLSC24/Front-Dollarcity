import { Auth } from "aws-amplify";
// To federated sign in from Facebook
class SignInWithFacebook {
  signInFacebook() {
    const fb = window.FB;
    fb.getLoginStatus((response) => {
      console.log(response);
      if (response.status === "connected") {
        this.getAWSCredentials(response.authResponse);
      } else {
        fb.login(
          (response) => {
            if (!response || !response.authResponse) {
              return;
            }
            this.getAWSCredentials(response.authResponse);
          },
          {
            // the authorized scopes
            scope: "public_profile,email",
          }
        );
      }
    });
  }

  getAWSCredentials(response) {
    console.log(response);
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
  }

  createScript() {
    // load the sdk
    window.fbAsyncInit = this.fbAsyncInit;
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onload = this.initFB;
    document.body.appendChild(script);
  }

  initFB() {
    const fb = window.FB;
    console.log("FB SDK initialized");
  }

  fbAsyncInit() {
    // init the fb sdk client
    const fb = window.FB;
    fb.init({
      appId: "your_facebook_app_id",
      cookie: true,
      xfbml: true,
      version: "v2.11",
    });
  }
}

export default SignInWithFacebook;
