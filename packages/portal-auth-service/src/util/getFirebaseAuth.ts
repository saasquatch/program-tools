import config from "../config";
import firebase from "firebase";

const appMap = new Map<string, firebase.app.App>();

export const getFirebaseAuth = (tenantAlias: string) => {
  const firebaseConfig = {
    apiKey: config(tenantAlias).FIREBASE_API_KEY,
    authDomain: config(tenantAlias).FIREBASE_AUTH_DOMAIN,
  };
  // initialize once per tenantAlias
  if (!appMap.has(tenantAlias)) {
    appMap.set(
      tenantAlias,
      firebase.initializeApp(firebaseConfig, tenantAlias)
    );
  }
  const auth = firebase.app(tenantAlias).auth();
  auth.tenantId = config(tenantAlias).FIREBASE_AUTH_TENANT_ID;

  return auth;
};
