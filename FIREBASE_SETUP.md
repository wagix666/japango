# Firebase Authentication Setup

JapanGo uses Firebase Authentication for email verification and Google sign-in. Learning progress is stored separately for each signed-in account. Set up Firestore as described in [FIRESTORE_SETUP.md](FIRESTORE_SETUP.md) to sync progress across browsers and devices.

## 1. Create a Firebase project

1. Open [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2. Select **Add project** and follow the setup wizard. Analytics is optional for this MVP.
3. In the project overview, choose **Add app** and select the Web app (`</>`).
4. Register the app and copy the Firebase web configuration values.

The web config's `apiKey`, `authDomain`, `projectId`, and `appId` identify the Firebase project; they are not server secrets. Never put a service-account private key in browser code.

## 2. Enable the sign-in providers

1. In Firebase Console, open **Authentication → Sign-in method**.
2. Enable **Email/Password** and save.
3. Enable **Google**, choose the support email, and save.
4. Under **Authentication → Settings → Authorized domains**, add `localhost` for local testing. Add your deployed website domain before production use.
5. Under **Authentication → Templates**, review the email verification message and sender settings.

## 3. Add the web configuration

Open `firebase-config.js` and fill the four empty string values from the Firebase web app config:

```js
window.JAPANGO_FIREBASE_CONFIG = {
  apiKey: "YOUR_WEB_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_WEB_APP_ID"
};
```

Do not include a Firebase Admin SDK service-account key here.

## 4. Run on localhost

Firebase OAuth does not work reliably from a `file://` page. In VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**. The address should start with `http://127.0.0.1:` or `http://localhost:`. Confirm that hostname is listed under Firebase **Authorized domains**.

## 5. Set up per-account progress

Follow [FIRESTORE_SETUP.md](FIRESTORE_SETUP.md) to create Firestore and publish the per-user security rules. Without Firestore, progress remains cached separately by account on this browser but cannot sync to other devices.

## 6. Try account flows

- Create an account with an email and password. JapanGo sends Firebase's verification email and asks you to verify before logging in.
- Open the email's verification link, return to JapanGo, then log in with the email/password.
- Select **Log in with Google** to use Google OAuth.
- Use **Profile** to view the Firebase profile, update the display name, or log out.

The verification email requires network access. The free Firebase Spark plan has quotas and limits that can change; check the current [Firebase pricing page](https://firebase.google.com/pricing) before launch. Set budget alerts if you enable paid Google Cloud services.

## Notes

- Email and Google identities are stored by Firebase, not in this website's local account list.
- The app checks Firebase `emailVerified` before allowing email/password login and sends another verification email if needed.
- Google sign-in uses a redirect on touch devices and a popup on desktop browsers.
- Learning progress and quiz history are stored under each account's UID in Firestore when Firestore has been enabled and its rules published.
- The JavaScript configuration file is public client configuration. Security must come from Firebase Authentication settings and properly configured service security rules, not from hiding this config.
