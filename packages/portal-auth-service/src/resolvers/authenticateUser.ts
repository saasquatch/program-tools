import { generateSquatchJWT } from "../util/generateSquatchJWT";
import fetch from "node-fetch";
import config from "../config";
import { getFirebaseAuth } from "../util/getFirebaseAuth";
import { getFirebaseAdminAuth } from "../util/getFirebaseAdminAuth";
import { handleWebhookResponseError } from "../util/handleWebhookResponseError";
import { AuthenticationError, ForbiddenError } from "apollo-server-errors";
import { signWithJWK } from "../util/JWKSKeyStore";
import { getLogger } from "../logger";

interface AuthenticateUserBody {
  email: string;
  id: string;
  accountId: string;
  tenantAlias: string;
}

interface AuthenticateUserResult {
  sessionData?: {
    [key: string]:
      | string
      | number
      | boolean
      | null
      | object
      | Array<string | number | boolean | null | object>;
  };
}
export const authenticateUser = async (
  source: any,
  args: Record<string, any>,
  context: { tenantAlias: string }
) => {
  const { tenantAlias } = context;
  const cfg = config(tenantAlias);

  const { input } = args;
  const { email, password } = input;

  const auth = getFirebaseAuth(tenantAlias);

  let uid;
  try {
    const userCredentials = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    // essentially a typecheck
    if (!userCredentials.user)
      throw new Error("Firebase User was not returned");

    const verifyToken = await userCredentials.user.getIdToken();

    const adminAuth = await getFirebaseAdminAuth(tenantAlias);
    const firebaseUser = await adminAuth.verifyIdToken(verifyToken);
    uid = firebaseUser.uid;
  } catch (e) {
    switch (e?.code) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        throw new AuthenticationError("Invalid Credentials.");
      case "auth/user-disabled":
        throw new ForbiddenError("Account Disabled.");
      default:
        throw e;
    }
  }

  const id = config(tenantAlias).ID_PREFIX + uid;

  const squatchUser = {
    id: id,
    accountId: id,
    email,
    verified: false,
  };

  let sessionData = {};
  if (cfg.AUTHENTICATE_USER_WEBHOOK_URL) {
    const signInBody: AuthenticateUserBody = {
      ...squatchUser,
      tenantAlias,
    };
    const body = JSON.stringify(signInBody);
    const payloadlessHeader = await signWithJWK(body);
    const response = await fetch(cfg.AUTHENTICATE_USER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-hook-jws-rfc-7797": payloadlessHeader,
      },
      body,
    });
    handleWebhookResponseError(response);
    const result: AuthenticateUserResult = await response.json();
    sessionData = result.sessionData || {};
  }

  const squatchJWT = await generateSquatchJWT(squatchUser, tenantAlias);

  getLogger().debug(`User: ${id} logged in.`);
  return {
    squatchJWT,
    sessionData,
  };
};
