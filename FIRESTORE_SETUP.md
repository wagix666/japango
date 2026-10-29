# Save learning progress per account

JapanGo saves lesson completion, quiz history, activity dates, and language settings in Firestore under the signed-in user's own UID. A separate browser cache is also kept for each UID.

## Enable Firestore

1. Open the `japango-2da0d` project in the [Firebase Console](https://console.firebase.google.com/).
2. Open **Build → Firestore Database** and choose **Create database**. Production mode is recommended.
3. Choose a database location near your users. Firebase does not let you change this location later.
4. Open the database's **Rules** tab. Replace the rules with the contents of [`firestore.rules`](firestore.rules) and click **Publish**.

The rules allow a signed-in user to read and write only `users/{their-own-uid}/appData/*`. Do not replace them with open rules such as `allow read, write: if true`.

## Existing browser progress

When a signed-in account has no saved Firestore progress yet, JapanGo moves the existing browser progress into that first account, then clears the shared guest record. New progress is saved separately for each account. Firestore must be enabled for progress to sync across browsers or devices; without it, the per-account browser cache still works on the current device.
