const FIREBASE_VERSION = '13.1.0';
const config = window.JAPANGO_FIREBASE_CONFIG || {};
const authState = {
  configured: false,
  status: 'loading',
  user: null,
  error: ''
};

const authApi = {
  state: authState,
  signUp: null,
  signIn: null,
  signInWithGoogle: null,
  signOut: null,
  updateDisplayName: null,
  resendVerification: null,
  loadProgress: null,
  saveProgress: null
};

window.JapanGoFirebaseAuth = authApi;

function publishState() {
  window.dispatchEvent(new CustomEvent('japango-auth-state', { detail: { ...authState } }));
}

function hasFirebaseConfig(value) {
  return ['apiKey', 'authDomain', 'projectId', 'appId'].every((key) => {
    return typeof value[key] === 'string' && value[key].trim() && !value[key].includes('YOUR_');
  });
}

async function initializeFirebase() {
  if (!hasFirebaseConfig(config)) {
    authState.status = 'unconfigured';
    authState.error = 'Firebase web configuration is missing.';
    publishState();
    return;
  }

  try {
    const [appSdk, authSdk, firestoreSdk] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`)
    ]);
    const app = appSdk.initializeApp(config);
    const auth = authSdk.getAuth(app);
    const db = firestoreSdk.getFirestore(app);
    await authSdk.setPersistence(auth, authSdk.browserLocalPersistence);

    authApi.signUp = async ({ email, password, displayName }) => {
      const credential = await authSdk.createUserWithEmailAndPassword(auth, email, password);
      await authSdk.updateProfile(credential.user, { displayName });
      await authSdk.sendEmailVerification(credential.user);
      await authSdk.signOut(auth);
      return { verificationSent: true, email };
    };

    authApi.signIn = async ({ email, password }) => {
      const credential = await authSdk.signInWithEmailAndPassword(auth, email, password);
      await authSdk.reload(credential.user);
      if (!credential.user.emailVerified) {
        await authSdk.sendEmailVerification(credential.user);
        await authSdk.signOut(auth);
        const error = new Error('Email address is not verified. A new verification email was sent.');
        error.code = 'auth/email-not-verified';
        throw error;
      }
      return credential.user;
    };

    authApi.signInWithGoogle = async () => {
      const provider = new authSdk.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      if (window.matchMedia('(pointer: coarse)').matches) {
        await authSdk.signInWithRedirect(auth, provider);
        return null;
      }
      const credential = await authSdk.signInWithPopup(auth, provider);
      return credential.user;
    };

    authApi.signOut = () => authSdk.signOut(auth);
    authApi.loadProgress = async () => {
      const user = auth.currentUser;
      if (!user) throw new Error('Sign in before loading learning progress.');
      const progressRef = firestoreSdk.doc(db, 'users', user.uid, 'appData', 'progress');
      const snapshot = await firestoreSdk.getDoc(progressRef);
      if (!snapshot.exists()) return null;
      const data = snapshot.data();
      return data.progress ? { progress: data.progress, savedAt: data.clientUpdatedAt || 0 } : null;
    };
    authApi.saveProgress = async (progress, savedAt) => {
      const user = auth.currentUser;
      if (!user) throw new Error('Sign in before saving learning progress.');
      const progressRef = firestoreSdk.doc(db, 'users', user.uid, 'appData', 'progress');
      await firestoreSdk.setDoc(progressRef, {
        progress,
        clientUpdatedAt: savedAt,
        updatedAt: firestoreSdk.serverTimestamp()
      }, { merge: true });
    };
    authApi.resendVerification = async () => {
      const user = auth.currentUser;
      if (!user) throw new Error('No signed-in user. Log in again to resend verification.');
      await authSdk.sendEmailVerification(user);
      return true;
    };
    authApi.updateDisplayName = async (displayName) => {
      const user = auth.currentUser;
      if (!user) throw new Error('No signed-in user.');
      await authSdk.updateProfile(user, { displayName });
      await authSdk.reload(user);
      return auth.currentUser;
    };

    authState.configured = true;
    authState.status = 'ready';
    authState.error = '';
    authSdk.onAuthStateChanged(auth, (user) => {
      authState.user = user ? {
        uid: user.uid,
        displayName: user.displayName || user.email?.split('@')[0] || 'Learner',
        email: user.email || '',
        emailVerified: Boolean(user.emailVerified || user.providerData.some((provider) => provider.providerId === 'google.com')),
        photoURL: user.photoURL || '',
        providerIds: user.providerData.map((item) => item.providerId)
      } : null;
      if (authState.user && !authState.user.emailVerified) authState.user = null;
      publishState();
    });
  } catch (error) {
    authState.status = 'load-error';
    authState.error = error.message || 'Firebase could not be loaded.';
    publishState();
  }
}

initializeFirebase();
