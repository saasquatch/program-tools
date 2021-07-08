import config from "../config";
import * as admin from "firebase-admin";
import os from "os";
import fs from "fs";

const credentialsPath =
  os.tmpdir() + "/portal_auth_google_service_credentials.json";

const fileExists = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      if (err) return resolve(false);
      resolve(true);
    });
  });
};

export const getFirebaseAdminAuth = async (tenantAlias: string) => {
  const credentialsJSON = JSON.stringify(
    config(tenantAlias).GOOGLE_APPLICATION_CREDENTIALS_JSON
  );

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // flush on startup
    if (await fileExists(credentialsPath)) {
      await new Promise<void>((resolve, reject) => {
        fs.unlink(credentialsPath, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
    await new Promise<void>((resolve, reject) => {
      fs.writeFile(credentialsPath, credentialsJSON, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
  }
  const firebaseConfig = {
    credential: admin.credential.applicationDefault(),
    databaseURL: config(tenantAlias).FIREBASE_DB_URL,
  };
  // initialize once
  if (!admin.apps.length) {
    admin.initializeApp(firebaseConfig);
  }
  return admin
    .app()
    .auth()
    .tenantManager()
    .authForTenant(config(tenantAlias).FIREBASE_AUTH_TENANT_ID);
};
